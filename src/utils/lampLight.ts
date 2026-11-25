export type LampLightMode = 'warm' | 'crimson' | 'emerald' | 'ice' | 'candle' | 'off';

export interface LampLightConfig {
  id: LampLightMode;
  name: string;
  emoji: string;
  radialGlow: string;
  coreGlow: string;
  fairyColors: string[];
  accentColor: string;
}

export const LAMP_LIGHT_CONFIGS: Record<LampLightMode, LampLightConfig> = {
  warm: {
    id: 'warm',
    name: 'Warm Gold',
    emoji: '✨',
    radialGlow:
      'radial-gradient(circle, rgba(255, 224, 140, 0.72) 0%, rgba(255, 175, 65, 0.42) 32%, rgba(255, 130, 30, 0.14) 55%, rgba(255, 100, 20, 0) 72%)',
    coreGlow:
      'radial-gradient(circle, rgba(255, 248, 214, 0.7) 0%, rgba(255, 205, 95, 0.35) 45%, rgba(255, 160, 40, 0) 72%)',
    fairyColors: ['#ffe9a6', '#ffd166', '#ffb703', '#fef08a', '#ffd166'],
    accentColor: '#f7d070',
  },
  crimson: {
    id: 'crimson',
    name: 'Festive Crimson',
    emoji: '🏮',
    radialGlow:
      'radial-gradient(circle, rgba(255, 105, 115, 0.78) 0%, rgba(235, 40, 60, 0.46) 34%, rgba(190, 20, 40, 0.16) 56%, rgba(160, 10, 30, 0) 72%)',
    coreGlow:
      'radial-gradient(circle, rgba(255, 210, 215, 0.68) 0%, rgba(255, 75, 95, 0.42) 45%, rgba(220, 20, 45, 0) 72%)',
    fairyColors: ['#ff8fa3', '#ff4d6d', '#ffd166', '#ff758f', '#c9184a'],
    accentColor: '#ff6b7a',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Pine',
    emoji: '🎄',
    radialGlow:
      'radial-gradient(circle, rgba(125, 255, 175, 0.75) 0%, rgba(40, 210, 110, 0.44) 34%, rgba(20, 150, 75, 0.15) 56%, rgba(15, 120, 55, 0) 72%)',
    coreGlow:
      'radial-gradient(circle, rgba(225, 255, 235, 0.68) 0%, rgba(75, 240, 145, 0.4) 45%, rgba(30, 180, 90, 0) 72%)',
    fairyColors: ['#a7f3d0', '#34d399', '#ffd166', '#10b981', '#6ee7b7'],
    accentColor: '#6ee7b7',
  },
  ice: {
    id: 'ice',
    name: 'Winter Starlight',
    emoji: '❄️',
    radialGlow:
      'radial-gradient(circle, rgba(195, 240, 255, 0.78) 0%, rgba(100, 195, 255, 0.46) 34%, rgba(50, 135, 245, 0.16) 56%, rgba(35, 110, 220, 0) 72%)',
    coreGlow:
      'radial-gradient(circle, rgba(240, 250, 255, 0.72) 0%, rgba(125, 215, 255, 0.42) 45%, rgba(60, 160, 255, 0) 72%)',
    fairyColors: ['#e0f2fe', '#7dd3fc', '#ffffff', '#38bdf8', '#bae6fd'],
    accentColor: '#93c5fd',
  },
  candle: {
    id: 'candle',
    name: 'Cozy Candle',
    emoji: '🕯️',
    radialGlow:
      'radial-gradient(circle, rgba(255, 195, 100, 0.52) 0%, rgba(255, 135, 40, 0.26) 34%, rgba(255, 90, 15, 0.08) 55%, rgba(255, 80, 10, 0) 72%)',
    coreGlow:
      'radial-gradient(circle, rgba(255, 235, 190, 0.5) 0%, rgba(255, 165, 65, 0.25) 45%, rgba(255, 110, 20, 0) 72%)',
    fairyColors: ['#fef3c7', '#fde68a', '#fcd34d', '#fef3c7', '#fde047'],
    accentColor: '#fbbf24',
  },
  off: {
    id: 'off',
    name: 'Lights Off',
    emoji: '🌙',
    radialGlow:
      'radial-gradient(circle, rgba(4, 10, 24, 0.72) 0%, rgba(4, 10, 24, 0.45) 38%, rgba(4, 10, 24, 0.12) 58%, rgba(4, 10, 24, 0) 72%)',
    coreGlow: 'none',
    fairyColors: ['#4b3c2d', '#3b2f21', '#423424', '#3b2f21', '#4b3c2d'],
    accentColor: '#4b5563',
  },
};

export const LAMP_LIGHT_MODES: LampLightMode[] = ['warm', 'crimson', 'emerald', 'ice', 'candle', 'off'];
