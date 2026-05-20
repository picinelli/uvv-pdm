import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../components/CustomDrawerContent';
import TaskListScreen from '../screens/TaskListScreen';
import TaskCreateScreen from '../screens/TaskCreateScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import { colors } from '../theme/colors';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Tarefas"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
        drawerActiveBackgroundColor: '#EEF2FF',
        drawerLabelStyle: { marginLeft: -12, fontSize: 15 },
      }}
    >
      <Drawer.Screen
        name="Tarefas"
        component={TaskListScreen}
        options={{ title: 'Minhas Tarefas' }}
      />
      <Drawer.Screen
        name="NovaTarefa"
        component={TaskCreateScreen}
        options={{ title: 'Nova Tarefa' }}
      />
      <Drawer.Screen
        name="DetalheTarefa"
        component={TaskDetailScreen}
        options={{
          title: 'Detalhe da Tarefa',
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer.Navigator>
  );
}
