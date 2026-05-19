import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  subtitulo: {
    color: colors.textMuted,
    marginBottom: 20,
    fontSize: 14,
  },
  erroApi: {
    color: colors.error,
    marginBottom: 12,
    fontSize: 14,
  },
  botao: {
    marginTop: 6,
  },
});
