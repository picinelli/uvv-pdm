import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { useUser } from '../../contexts/UserContext';
import { styles } from './styles';

export default function CustomDrawerContent(props) {
  const { usuario, logout } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>PDM Tarefas</Text>
        <Text style={styles.subtitle}>
          {usuario ? `Olá, ${usuario.nome.split(' ')[0]}` : 'Cadastre-se para começar'}
        </Text>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={styles.itemsContainer}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {usuario ? (
        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
