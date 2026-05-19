import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
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
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
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
  botao: {
    marginTop: 8,
  },
});
