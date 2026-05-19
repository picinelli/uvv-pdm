import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  pickerBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    color: colors.text,
  },
  errorBox: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    marginTop: 4,
    fontSize: 13,
  },
});
