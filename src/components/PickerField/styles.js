import { Platform, StyleSheet } from 'react-native';

import { webContentWidth } from '../../utils/webLayout';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
    ...webContentWidth,
  },
  areaClicavel: {
    width: '100%',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  input: {
    backgroundColor: 'transparent',
  },
  outline: {
    borderRadius: 12,
  },
  campoNativo: {
    position: 'relative',
  },
  pickerSobreposto: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: Platform.OS === 'ios' ? 1 : 0.02,
    color: 'transparent',
  },
});
