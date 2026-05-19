import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.error,
    marginBottom: 12,
  },
  mensagem: {
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
