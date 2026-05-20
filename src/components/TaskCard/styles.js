import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  titulo: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  headerActions: {
    alignItems: 'flex-end',
    gap: 4,
  },
  data: {
    fontSize: 12,
    color: colors.textMuted,
  },
  excluir: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.error,
  },
  descricao: {
    color: colors.textMuted,
    marginBottom: 10,
    fontSize: 14,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
