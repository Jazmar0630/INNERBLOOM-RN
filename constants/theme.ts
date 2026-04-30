import { Platform } from 'react-native';

export const Colors = {
  primary: '#7C6FCD',
  secondary: '#B8A9E8',
  accent: '#F4A7B9',
  background: '#F9F6FF',
  surface: '#FFFFFF',
  textPrimary: '#2D2D3A',
  textSecondary: '#7A7A9D',
  success: '#6FCF97',
  warning: '#F2C94C',
  error: '#EB5757',

  light: {
    text: '#2D2D3A',
    background: '#F9F6FF',
    tint: '#7C6FCD',
    icon: '#7A7A9D',
    tabIconDefault: '#7A7A9D',
    tabIconSelected: '#7C6FCD',
  },
  dark: {
    text: '#F0EEFF',
    background: '#1A1A2E',
    tint: '#B8A9E8',
    icon: '#9B9BBF',
    tabIconDefault: '#9B9BBF',
    tabIconSelected: '#B8A9E8',
  },
};

export const Fonts = Platform.select({
  ios: { sans: 'system-ui', serif: 'ui-serif', rounded: 'ui-rounded', mono: 'ui-monospace' },
  default: { sans: 'normal', serif: 'serif', rounded: 'normal', mono: 'monospace' },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});
