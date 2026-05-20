import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import { useUser } from '../contexts/UserContext';
import { colors } from '../theme/colors';

export default function RootNavigator() {
  const { logado, carregando } = useUser();

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return logado ? <DrawerNavigator key="app" /> : <AuthNavigator key="auth" />;
}
