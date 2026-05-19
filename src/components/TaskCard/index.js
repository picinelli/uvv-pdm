import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { statusColors, priorityColors } from '../../theme/colors';
import { styles } from './styles';

const STATUS_LABEL = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
};

const PRIORIDADE_LABEL = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
};

export default function TaskCard({ tarefa, onPress }) {
  const dataFormatada = tarefa.created_at
    ? new Date(tarefa.created_at).toLocaleDateString('pt-BR')
    : '';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.header}>
        <Text style={styles.titulo} numberOfLines={1}>
          {tarefa.titulo}
        </Text>
        <Text style={styles.data}>{dataFormatada}</Text>
      </View>

      {tarefa.descricao ? (
        <Text style={styles.descricao} numberOfLines={2}>
          {tarefa.descricao}
        </Text>
      ) : null}

      <View style={styles.tagsRow}>
        <View style={[styles.tag, { backgroundColor: statusColors[tarefa.status] }]}>
          <Text style={styles.tagText}>{STATUS_LABEL[tarefa.status] ?? tarefa.status}</Text>
        </View>
        <View style={[styles.tag, { backgroundColor: priorityColors[tarefa.prioridade] }]}>
          <Text style={styles.tagText}>
            {PRIORIDADE_LABEL[tarefa.prioridade] ?? tarefa.prioridade}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
