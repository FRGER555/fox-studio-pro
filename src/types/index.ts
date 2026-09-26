export type AppTheme = 'dark' | 'light';

export interface StudioTrack {
  id: string;
  name: string;
  type: 'audio' | 'midi' | 'drums' | 'bass';
  pan: number;
  volume: number;
}
