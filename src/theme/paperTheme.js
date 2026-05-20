import { MD3LightTheme } from 'react-native-paper';

import { colors } from './colors';

export const paperTheme = {
  ...MD3LightTheme,
  roundness: 12,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    onPrimary: '#FFFFFF',
    primaryContainer: '#EEF2FF',
    onPrimaryContainer: colors.primaryDark,
    secondary: colors.secondary,
    onSecondary: '#FFFFFF',
    error: colors.error,
    onError: '#FFFFFF',
    background: colors.background,
    surface: colors.surface,
    surfaceVariant: '#F1F5F9',
    outline: colors.border,
    onSurface: colors.text,
    onSurfaceVariant: colors.textMuted,
  },
};
