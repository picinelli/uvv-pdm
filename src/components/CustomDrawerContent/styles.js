import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#E0E7FF',
    fontSize: 13,
    marginTop: 4,
  },
  itemsContainer: {
    paddingTop: 10,
  },
  logout: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  logoutText: {
    color: colors.error,
    fontWeight: '600',
    fontSize: 15,
  },
});
