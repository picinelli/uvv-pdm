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
  subtitulo: {
    color: colors.textMuted,
    marginBottom: 20,
    fontSize: 14,
  },
  aviso: {
    color: colors.textMuted,
    marginBottom: 16,
  },
  erro: {
    color: colors.error,
    marginBottom: 12,
  },
  botao: {
    marginTop: 6,
  },
});
