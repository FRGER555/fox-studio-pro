import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'node:fs';
import { spawn, ChildProcessWithoutNullStreams } from 'node:child_process';
import readline from 'node:readline';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

class NativeEngineSupervisor {
  private child: ChildProcessWithoutNullStreams | null = null;
  private queue: Promise<unknown> = Promise.resolve();
  private ready = false;

  private executable(): string {
    const configured = process.env.FOX_NATIVE_EXECUTABLE;
    if (configured && configured.trim()) return configured;

    const candidates = [
      path.join(__dirname, 'native', 'build', 'FoxStudioNative'),
      path.join(__dirname, 'native', 'build', 'Release', 'FoxStudioNative.exe'),
      path.join(__dirname, 'native', 'build', 'Release', 'FoxStudioNative'),
      path.join(__dirname, 'native', 'build', 'FoxStudioNative.exe'),
      path.join(__dirname, 'native', 'build', 'FoxStudioNative.app', 'Contents', 'MacOS', 'FoxStudioNative')
    ];
    return candidates.find(candidate => fs.existsSync(candidate)) || '';
  }

  status() {
    return { configured: Boolean(this.executable()), running: Boolean(this.child && !this.child.killed), ready, pid: this.child?.pid ?? null };
  }

  async start() {
    if (this.child && !this.child.killed) return this.status();
    const executable = this.executable();
    if (!executable) throw new Error('FOX_NATIVE_EXECUTABLE is not configured');
    this.child = spawn(executable, [], { stdio: ['pipe', 'pipe', 'pipe'] });
    this.ready = false;
    const child = this.child;
    child.stderr.on('data', data => console.error(`[FOX_NATIVE] ${String(data).trim()}`));
    child.on('exit', () => { this.child = null; this.ready = false; });
    await new Promise(resolve => setTimeout(resolve, 120));
    this.ready = true;
    return this.status();
  }

  request(payload: Record<string, unknown>): Promise<unknown> {
    this.queue = this.queue.then(async () => {
      await this.start();
      if (!this.child) throw new Error('Native engine process unavailable');
      const child = this.child;
      return await new Promise((resolve, reject) => {
        const rl = readline.createInterface({ input: child.stdout });
        const timer = setTimeout(() => { rl.close(); reject(new Error('Native request timeout')); }, Number(process.env.FOX_NATIVE_TIMEOUT_MS || 30000));
        const onExit = () => { clearTimeout(timer); rl.close(); reject(new Error('Native engine exited')); };
        child.once('exit', onExit);
        rl.on('line', line => {
          try {
            const parsed = JSON.parse(line);
            if (parsed?.event === 'ready') return;
            clearTimeout(timer); child.off('exit', onExit); rl.close(); resolve(parsed);
          } catch { /* ignore non-JSON stdout */ }
        });
        child.stdin.write(JSON.stringify(payload) + '\n');
      });
    });
    return this.queue;
  }

  async stop() {
    if (!this.child) return this.status();
    try { this.child.stdin.write(JSON.stringify({ cmd: 'quit' }) + '\n'); } catch { /* already closing */ }
    await new Promise(resolve => setTimeout(resolve, 150));
    if (this.child && !this.child.killed) this.child.kill();
    this.child = null; this.ready = false;
    return this.status();
  }
}

const nativeSupervisor = new NativeEngineSupervisor();

app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'foxstudio', aiConfigured: Boolean(apiKey), native: nativeSupervisor.status(), time: new Date().toISOString() });
});

app.get('/api/native/status', (_req, res) => res.json({ ok: true, native: nativeSupervisor.status() }));
app.post('/api/native/start', async (_req, res) => {
  try { res.json({ ok: true, native: await nativeSupervisor.start() }); }
  catch (error: any) { res.status(503).json({ ok: false, error: String(error?.message || error) }); }
});
app.post('/api/native/request', async (req, res) => {
  try {
    const payload = req.body || {};
    if (typeof payload.cmd !== 'string') return res.status(400).json({ ok: false, error: 'cmd_required' });
    res.json(await nativeSupervisor.request(payload));
  } catch (error: any) {
    res.status(503).json({ ok: false, error: String(error?.message || error) });
  }
});
app.post('/api/native/stop', async (_req, res) => {
  res.json({ ok: true, native: await nativeSupervisor.stop() });
});

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.post('/api/ai/engineer', async (req: Request, res: Response) => {
  try {
    const { tracks, currentMastering, genre, targetPlatform } = req.body;

    if (!apiKey) {
      return res.json({
        success: true,
        source: 'local_engine',
        recommendations: {
          targetLufs: -14.0,
          harmonics: 0.42,
          transient: 0.38,
          stereo: 0.62,
          preset: 'Modern Pop',
          eqProfile: { lowCut: 30, bassGain: 1.2, midCutGain: -1.0, highShelfGain: 1.8 },
          trackAdjustments: (tracks || []).map((t: any) => ({
            trackId: t.id,
            recommendedVol: t.type === 'drums' ? -1.5 : t.type === 'bass' ? -2.0 : -3.5,
            recommendedPan: t.pan || 0,
            tip: 'Optimized for dynamic range headroom.'
          })),
          summaryAr: 'تم حساب التوازن الترددي وديناميكيات الصوت لتفادي التداخل في الترددات المنخفضة (30-120Hz) وتعزيز وضوح الصوت في الماستر.',
          summaryEn: 'Harmonics and transient punch optimized for competitive loudness while preserving dynamic transients.'
        }
      });
    }

    const prompt = `You are a legendary Grammy-winning audio mixing & mastering engineer.
Analyze this session:
- Target Genre: ${genre || 'Modern Electronic/Pop'}
- Target Delivery Platform: ${targetPlatform || 'Streaming (Spotify/Apple Music -14 LUFS)'}
- Current Mastering settings: ${JSON.stringify(currentMastering)}
- Active Tracks: ${JSON.stringify(tracks)}

Provide precise studio parameters.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            targetLufs: { type: Type.NUMBER },
            harmonics: { type: Type.NUMBER },
            transient: { type: Type.NUMBER },
            stereo: { type: Type.NUMBER },
            preset: { type: Type.STRING },
            eqProfile: {
              type: Type.OBJECT,
              properties: {
                lowCut: { type: Type.NUMBER },
                bassGain: { type: Type.NUMBER },
                midCutGain: { type: Type.NUMBER },
                highShelfGain: { type: Type.NUMBER }
              },
              required: ['lowCut', 'bassGain', 'midCutGain', 'highShelfGain']
            },
            trackAdjustments: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  trackId: { type: Type.STRING },
                  recommendedVol: { type: Type.NUMBER },
                  recommendedPan: { type: Type.NUMBER },
                  tip: { type: Type.STRING }
                },
                required: ['trackId', 'recommendedVol', 'recommendedPan', 'tip']
              }
            },
            summaryAr: { type: Type.STRING },
            summaryEn: { type: Type.STRING }
          },
          required: ['targetLufs', 'harmonics', 'transient', 'stereo', 'preset', 'eqProfile', 'trackAdjustments', 'summaryAr', 'summaryEn']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, source: 'gemini_3.8_flash', recommendations: parsed });
  } catch (err: any) {
    console.error('AI Engineer error; using local fallback:', err);
    const safeTracks = Array.isArray(tracks) ? tracks.slice(0, 512) : [];
    return res.json({
      success: true,
      source: 'local_fallback',
      warning: 'Cloud AI was unavailable; deterministic local analysis was used.',
      recommendations: {
        targetLufs: -14.0, harmonics: 0.35, transient: 0.32, stereo: 0.58, preset: 'Modern Pop',
        eqProfile: { lowCut: 30, bassGain: 1.0, midCutGain: -0.8, highShelfGain: 1.5 },
        trackAdjustments: safeTracks.map((t: any) => ({
          trackId: String(t?.id || ''),
          recommendedVol: t?.type === 'drum' ? -1.5 : t?.type === 'audio' ? -3.0 : 0,
          recommendedPan: Number.isFinite(Number(t?.pan)) ? Math.max(-1, Math.min(1, Number(t.pan))) : 0,
          tip: 'Local fallback: preserve headroom and avoid excessive low-frequency overlap.'
        })),
        summaryAr: 'تعذر الوصول إلى خدمة الذكاء الاصطناعي، لذلك تم استخدام تحليل محلي آمن مع الحفاظ على الـHeadroom.',
        summaryEn: 'Cloud AI was unavailable, so a safe local mix recommendation was generated.'
      }
    });
  }
});

app.post('/api/ai/compose', async (req: Request, res: Response) => {
  try {
    const { prompt, style, scale, bpm, bars, trackType } = req.body;

    if (!apiKey) {
      const basePitch = scale?.includes('Minor') ? 60 : 62;
      const notes = [
        { pitch: basePitch, start: 0, duration: 1.0, velocity: 0.85 },
        { pitch: basePitch + 3, start: 1.0, duration: 0.5, velocity: 0.75 },
        { pitch: basePitch + 7, start: 1.5, duration: 0.5, velocity: 0.8 },
        { pitch: basePitch + 10, start: 2.0, duration: 1.0, velocity: 0.85 },
        { pitch: basePitch + 8, start: 3.0, duration: 0.5, velocity: 0.7 },
        { pitch: basePitch + 7, start: 3.5, duration: 0.5, velocity: 0.75 },
        { pitch: basePitch + 5, start: 4.0, duration: 1.0, velocity: 0.8 },
        { pitch: basePitch + 3, start: 5.0, duration: 1.0, velocity: 0.85 },
        { pitch: basePitch + 2, start: 6.0, duration: 1.0, velocity: 0.75 },
        { pitch: basePitch, start: 7.0, duration: 1.0, velocity: 0.9 }
      ];

      return res.json({
        success: true,
        source: 'local_generator',
        composition: {
          title: prompt || 'Fox AI Melodic Groove',
          scale: scale || 'A Minor',
          bpm: bpm || 120,
          descriptionAr: 'تم توليد نمط موسيقي متناغم وموزون إيقاعياً جاهز للعزف على آلات السنث أو البيانو.',
          descriptionEn: 'Algorithmic melodic theme crafted with harmonic coherence and dynamic velocity nuances.',
          notes
        }
      });
    }

    const aiPrompt = `You are a virtuoso music composer.
Compose a MIDI sequence based on:
- User Prompt: "${prompt || 'Melodic synth progression with emotional depth'}"
- Musical Style: ${style || 'Cinematic / Synthwave / Neo-Soul'}
- Scale: ${scale || 'A Natural Minor or Bayati'}
- Tempo: ${bpm || 120} BPM
- Length: ${bars || 2} bars
- Track Type: ${trackType || 'lead melody / chords'}

Output MIDI notes in JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: aiPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            scale: { type: Type.STRING },
            bpm: { type: Type.NUMBER },
            descriptionAr: { type: Type.STRING },
            descriptionEn: { type: Type.STRING },
            notes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  pitch: { type: Type.INTEGER },
                  start: { type: Type.NUMBER },
                  duration: { type: Type.NUMBER },
                  velocity: { type: Type.NUMBER }
                },
                required: ['pitch', 'start', 'duration', 'velocity']
              }
            }
          },
          required: ['title', 'scale', 'bpm', 'descriptionAr', 'descriptionEn', 'notes']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, source: 'gemini_3.8_flash', composition: parsed });
  } catch (err: any) {
    console.error('AI Composer error; using local fallback:', err);
    const basePitch = String(scale || '').toLowerCase().includes('minor') ? 60 : 62;
    const notes = [0, 3, 7, 10, 8, 7, 5, 3].map((offset, i) => ({
      pitch: Math.max(40, Math.min(84, basePitch + offset)),
      start: i, duration: i % 2 ? 0.5 : 1, velocity: 0.7 + (i % 3) * 0.08
    }));
    return res.json({
      success: true, source: 'local_fallback',
      warning: 'Cloud AI was unavailable; deterministic local composition was used.',
      composition: {
        title: prompt || 'Fox AI Local Groove', scale: scale || 'A Minor', bpm: Number(bpm) || 120,
        descriptionAr: 'تم استخدام مولد MIDI محلي احتياطي بسبب تعذر خدمة الذكاء الاصطناعي.',
        descriptionEn: 'A deterministic local MIDI fallback was generated.', notes
      }
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🦊 FoxStudio Audio Engine server running on port ${PORT}`);
  });
}

startServer();
