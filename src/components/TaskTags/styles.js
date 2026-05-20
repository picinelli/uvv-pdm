import { StyleSheet } from 'react-native';

import { webContentWidth } from '../../utils/webLayout';

export const styles = StyleSheet.create({
  wrapper: {
    ...webContentWidth,
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
