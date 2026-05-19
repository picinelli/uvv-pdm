import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

export default function EmptyState({ titulo, descricao }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      {descricao ? <Text style={styles.descricao}>{descricao}</Text> : null}
    </View>
  );
}
