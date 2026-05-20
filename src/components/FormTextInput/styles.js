import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { webContentWidth } from '../../utils/webLayout';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
    ...webContentWidth,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  multiline: {
    minHeight: 90,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    marginTop: 4,
    fontSize: 13,
  },
});
