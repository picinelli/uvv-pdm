import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../components/CustomDrawerContent';
import UserRegisterScreen from '../screens/UserRegisterScreen';
import TaskListScreen from '../screens/TaskListScreen';
import TaskCreateScreen from '../screens/TaskCreateScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import { colors } from '../theme/colors';
import { useUser } from '../contexts/UserContext';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { usuario } = useUser();
  const logado = Boolean(usuario);

  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      initialRouteName={logado ? 'Tarefas' : 'Cadastro'}
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
        name="Cadastro"
        component={UserRegisterScreen}
        options={{ title: 'Cadastro de Usuário' }}
      />
      <Drawer.Screen
        name="Tarefas"
        component={TaskListScreen}
        options={{
          title: 'Minhas Tarefas',
          drawerItemStyle: logado ? undefined : { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="NovaTarefa"
        component={TaskCreateScreen}
        options={{
          title: 'Nova Tarefa',
          drawerItemStyle: logado ? undefined : { display: 'none' },
        }}
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
