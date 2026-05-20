import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import TaskTags from '../TaskTags';
import { formatarDataBR, obterDataTarefa } from '../../utils/dates';
import { styles } from './styles';

export default function TaskCard({
  tarefa,
  onPress,
  onDelete,
  onStatusChange,
  onPrioridadeChange,
  tagsDisabled = false,
}) {
  const dataFormatada = formatarDataBR(obterDataTarefa(tarefa));

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} disabled={!onPress}>
        <View style={styles.header}>
          <Text style={styles.titulo} numberOfLines={1}>
            {tarefa.titulo}
          </Text>
          <View style={styles.headerActions}>
            <Text style={styles.data}>{dataFormatada}</Text>
            {onDelete ? (
              <TouchableOpacity
                onPress={onDelete}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityRole="button"
                accessibilityLabel="Excluir tarefa"
              >
                <Text style={styles.excluir}>Excluir</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {tarefa.descricao ? (
          <Text style={styles.descricao} numberOfLines={2}>
            {tarefa.descricao}
          </Text>
        ) : null}
      </TouchableOpacity>

      <View style={styles.tagsWrapper}>
        <TaskTags
          tarefa={tarefa}
          onStatusChange={onStatusChange}
          onPrioridadeChange={onPrioridadeChange}
          disabled={tagsDisabled}
        />
      </View>
    </View>
  );
}
