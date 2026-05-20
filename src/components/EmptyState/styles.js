import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { webContentWidth } from '../../utils/webLayout';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 60,
    ...webContentWidth,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  descricao: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});
