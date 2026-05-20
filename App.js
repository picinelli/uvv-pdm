import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PaperProvider } from 'react-native-paper';

import RootNavigator from './src/navigation/RootNavigator';
import { paperTheme } from './src/theme/paperTheme';
import { UserProvider } from './src/contexts/UserContext';
import { TaskProvider } from './src/contexts/TaskContext';
import ErrorBoundary from './src/components/ErrorBoundary';
import { supabase } from './src/services/supabase';

export default function App() {
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });
    supabase.auth.startAutoRefresh();
    return () => sub.remove();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={paperTheme}>
          <ErrorBoundary>
            <UserProvider>
              <TaskProvider>
                <NavigationContainer>
                  <StatusBar style="light" />
                  <RootNavigator />
                </NavigationContainer>
              </TaskProvider>
            </UserProvider>
          </ErrorBoundary>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
