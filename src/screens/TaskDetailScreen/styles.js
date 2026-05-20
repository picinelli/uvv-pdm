import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { webContentWidth } from '../../utils/webLayout';

export const styles = StyleSheet.create({
  conteudo: {
    width: '100%',
    ...webContentWidth,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  data: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: 20,
    marginBottom: 6,
  },
  descricao: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 24,
  },
  erro: {
    color: colors.error,
    marginBottom: 16,
  },
  loading: {
    marginTop: 40,
  },
  botoes: {
    marginTop: 8,
    gap: 12,
  },
});
