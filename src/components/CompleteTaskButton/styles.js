import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { webContentWidth } from '../../utils/webLayout';

export const styles = StyleSheet.create({
  concluidaBadge: {
    backgroundColor: '#D1FAE5',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    ...webContentWidth,
  },
  concluidaBadgeCompact: {
    minHeight: 0,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  concluidaTexto: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  compact: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: '#ECFDF5',
    alignSelf: 'flex-start',
  },
  compactTexto: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.6,
  },
});
