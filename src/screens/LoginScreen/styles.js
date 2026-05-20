import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  subtitulo: {
    color: colors.textMuted,
    marginBottom: 20,
    fontSize: 14,
  },
  sucesso: {
    color: colors.secondary,
    backgroundColor: '#ECFDF5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
  },
  erro: {
    color: colors.error,
    marginBottom: 12,
    fontSize: 14,
  },
  botao: {
    marginTop: 6,
  },
  linkCadastro: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkTexto: {
    color: colors.textMuted,
    fontSize: 14,
  },
  linkDestaque: {
    color: colors.primary,
    fontWeight: '700',
  },
});
