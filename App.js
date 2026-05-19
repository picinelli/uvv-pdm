import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DrawerNavigator from './src/navigation/DrawerNavigator';
import { UserProvider } from './src/contexts/UserContext';
import { TaskProvider } from './src/contexts/TaskContext';
import ErrorBoundary from './src/components/ErrorBoundary';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <UserProvider>
            <TaskProvider>
              <NavigationContainer>
                <StatusBar style="light" />
                <DrawerNavigator />
              </NavigationContainer>
            </TaskProvider>
          </UserProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
