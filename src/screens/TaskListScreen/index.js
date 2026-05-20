import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, FlatList, Text, RefreshControl, ActivityIndicator } from 'react-native';

import PickerField from '../../components/PickerField';
import TaskCard from '../../components/TaskCard';
import EmptyState from '../../components/EmptyState';
import PrimaryButton from '../../components/PrimaryButton';
import { useTasks } from '../../contexts/TaskContext';
import { colors } from '../../theme/colors';
import { styles } from './styles';

const OPCOES_STATUS = [
  { label: 'Todos os status', value: 'todos' },
  { label: 'Pendente', value: 'pendente' },
  { label: 'Em andamento', value: 'em_andamento' },
  { label: 'Concluída', value: 'concluida' },
];

const OPCOES_PRIORIDADE = [
  { label: 'Todas as prioridades', value: 'todas' },
  { label: 'Baixa', value: 'baixa' },
  { label: 'Média', value: 'media' },
  { label: 'Alta', value: 'alta' },
];

export default function TaskListScreen({ navigation }) {
  const { tarefas, loading, error, carregar } = useTasks();
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroPrioridade, setFiltroPrioridade] = useState('todas');

  useEffect(() => {
    carregar();
  }, [carregar]);

  const tarefasFiltradas = useMemo(() => {
    return tarefas.filter((t) => {
      const statusOk = filtroStatus === 'todos' || t.status === filtroStatus;
      const prioridadeOk = filtroPrioridade === 'todas' || t.prioridade === filtroPrioridade;
      return statusOk && prioridadeOk;
    });
  }, [tarefas, filtroStatus, filtroPrioridade]);

  const handleAbrir = useCallback(
    (item) => navigation.navigate('DetalheTarefa', { taskId: item.id }),
    [navigation]
  );

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        <PickerField
          label="Status"
          value={filtroStatus}
          onValueChange={setFiltroStatus}
          options={OPCOES_STATUS}
        />
        <PickerField
          label="Prioridade"
          value={filtroPrioridade}
          onValueChange={setFiltroPrioridade}
          options={OPCOES_PRIORIDADE}
        />
      </View>

      {error ? <Text style={styles.erro}>{error}</Text> : null}

      {loading && tarefas.length === 0 ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loading} />
      ) : (
        <FlatList
          data={tarefasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskCard tarefa={item} onPress={() => handleAbrir(item)} />}
          contentContainerStyle={styles.lista}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={carregar} colors={[colors.primary]} />
          }
          ListEmptyComponent={
            <EmptyState
              titulo="Nenhuma tarefa encontrada"
              descricao={
                tarefas.length === 0
                  ? 'Crie sua primeira tarefa no menu Nova Tarefa.'
                  : 'Ajuste os filtros para ver outras tarefas.'
              }
            />
          }
        />
      )}

      <View style={styles.botaoFlutuante}>
        <PrimaryButton title="+ Nova tarefa" onPress={() => navigation.navigate('NovaTarefa')} />
      </View>
    </View>
  );
}
