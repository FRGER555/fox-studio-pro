import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-dot" />
          <div>
            <div className="eyebrow">FOX STUDIO PRO</div>
            <h1>Local Desktop DAW</h1>
          </div>
        </div>
        <nav className="nav">
          <button>Project</button>
          <button>Mix</button>
          <button>Arrange</button>
          <button>Render</button>
        </nav>
      </header>

      <main className="workspace">
        <aside className="sidebar">
          <section>
            <h3>Tracks</h3>
            <ul>
              <li>Drums</li>
              <li>Bass</li>
              <li>Lead</li>
              <li>Vocal</li>
            </ul>
          </section>
          <section>
            <h3>Native</h3>
            <ul>
              <li>JUCE Engine: Ready</li>
              <li>VST Host: Local</li>
              <li>Render Queue: Idle</li>
            </ul>
          </section>
        </aside>

        <section className="main-panel">
          <div className="transport">
            <button>⏮</button>
            <button>⏸</button>
            <button>⏵</button>
            <button>⏺</button>
            <span>120 BPM</span>
            <span>4/4</span>
            <span>Local Runtime</span>
          </div>

          <div className="timeline-panel">
            <div className="timeline-row"><span>Bar 1</span><span>Bar 2</span><span>Bar 3</span><span>Bar 4</span></div>
            <div className="timeline-grid"></div>
          </div>

          <div className="inspector-grid">
            <div className="card">
              <h4>Mix Console</h4>
              <div className="meter"></div>
            </div>
            <div className="card">
              <h4>AI Engineer</h4>
              <p>Local analysis • mix balance • mastering recommendations</p>
            </div>
            <div className="card">
              <h4>Render</h4>
              <p>WAV / stem export / offline queue</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
