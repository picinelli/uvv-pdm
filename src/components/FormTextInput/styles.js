import { StyleSheet } from 'react-native';

import { webContentWidth } from '../../utils/webLayout';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
    ...webContentWidth,
  },
  input: {
    backgroundColor: 'transparent',
  },
  outline: {
    borderRadius: 12,
  },
});
