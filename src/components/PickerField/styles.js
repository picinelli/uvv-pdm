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
});
