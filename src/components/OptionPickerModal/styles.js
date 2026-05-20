import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  opcao: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  opcaoSelecionada: {
    backgroundColor: '#EEF2FF',
  },
  opcaoTexto: {
    fontSize: 16,
    color: colors.text,
  },
  opcaoTextoSelecionado: {
    fontWeight: '700',
    color: colors.primary,
  },
  cancelar: {
    marginTop: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelarTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textMuted,
  },
});
