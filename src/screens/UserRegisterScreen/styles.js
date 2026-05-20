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
  sucesso: {
    color: colors.text,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 16,
    borderRadius: 10,
    marginBottom: 24,
    fontSize: 15,
    lineHeight: 22,
  },
  botao: {
    marginTop: 6,
  },
});
