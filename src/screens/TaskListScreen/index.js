import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { View, FlatList, Text, RefreshControl, ActivityIndicator } from 'react-native';

import PickerField from '../../components/PickerField';
import DateFilterCalendar from '../../components/DateFilterCalendar';
import TaskCard from '../../components/TaskCard';
import EmptyState from '../../components/EmptyState';
import PrimaryButton from '../../components/PrimaryButton';
import { useTasks } from '../../contexts/TaskContext';
import { hojeISO, obterDataTarefa, tarefaNaData, formatarDataBR } from '../../utils/dates';
import { showAlert } from '../../utils/alert';
import { notificarTarefaConcluida } from '../../utils/taskFeedback';
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
  const { tarefas, loading, error, carregar, excluir, atualizar } = useTasks();
  const [dataSelecionada, setDataSelecionada] = useState(hojeISO);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroPrioridade, setFiltroPrioridade] = useState('todas');
  const [excluindoId, setExcluindoId] = useState(null);
  const [atualizandoId, setAtualizandoId] = useState(null);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const datasComTarefas = useMemo(
    () => tarefas.map((t) => obterDataTarefa(t)),
    [tarefas]
  );

  const tarefasFiltradas = useMemo(() => {
    return tarefas.filter((t) => {
      const dataOk = tarefaNaData(t, dataSelecionada);
      const statusOk = filtroStatus === 'todos' || t.status === filtroStatus;
      const prioridadeOk = filtroPrioridade === 'todas' || t.prioridade === filtroPrioridade;
      return dataOk && statusOk && prioridadeOk;
    });
  }, [tarefas, dataSelecionada, filtroStatus, filtroPrioridade]);

  const handleAbrir = useCallback(
    (item) => navigation.navigate('DetalheTarefa', { taskId: item.id }),
    [navigation]
  );

  const handleExcluir = useCallback(
    (item) => {
      showAlert(
        'Excluir tarefa',
        `Deseja excluir "${item.titulo}"? Esta ação não pode ser desfeita.`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
              setExcluindoId(item.id);
              try {
                await excluir(item.id);
              } catch (e) {
                showAlert('Erro', e.message);
              } finally {
                setExcluindoId(null);
              }
            },
          },
        ]
      );
    },
    [excluir]
  );

  const handleAtualizarCampo = useCallback(
    async (item, patch) => {
      const statusAnterior = item.status;
      setAtualizandoId(item.id);
      try {
        await atualizar(item.id, patch);
        notificarTarefaConcluida(statusAnterior, patch.status);
      } catch (e) {
        showAlert('Erro', e.message);
      } finally {
        setAtualizandoId(null);
      }
    },
    [atualizar]
  );

  const cabecalhoLista = (
    <View style={styles.filtros}>
      <DateFilterCalendar
        selectedDate={dataSelecionada}
        onSelectDate={setDataSelecionada}
        markedDates={datasComTarefas}
      />
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
      {error ? <Text style={styles.erro}>{error}</Text> : null}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && tarefas.length === 0 ? (
        <View style={styles.carregando}>
          {cabecalhoLista}
          <ActivityIndicator size="large" color={colors.primary} style={styles.loading} />
        </View>
      ) : (
        <FlatList
          data={tarefasFiltradas}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={cabecalhoLista}
          renderItem={({ item }) => (
            <TaskCard
              tarefa={item}
              onPress={() => handleAbrir(item)}
              onDelete={excluindoId === item.id ? undefined : () => handleExcluir(item)}
              onConcluir={
                item.status === 'concluida' || excluindoId === item.id
                  ? undefined
                  : () => handleAtualizarCampo(item, { status: 'concluida' })
              }
              onStatusChange={(status) => handleAtualizarCampo(item, { status })}
              onPrioridadeChange={(prioridade) => handleAtualizarCampo(item, { prioridade })}
              tagsDisabled={atualizandoId === item.id || excluindoId === item.id}
              concluindo={atualizandoId === item.id}
            />
          )}
          contentContainerStyle={styles.lista}
          style={styles.listaFlex}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={carregar} colors={[colors.primary]} />
          }
          ListEmptyComponent={
            <EmptyState
              titulo="Nenhuma tarefa encontrada"
              descricao={
                tarefas.length === 0
                  ? 'Crie sua primeira tarefa no menu Nova Tarefa.'
                  : `Não há tarefas em ${formatarDataBR(dataSelecionada)}. Selecione outro dia no calendário ou crie uma nova tarefa.`
              }
            />
          }
        />
      )}

      <View style={styles.botaoFlutuante}>
        <View style={styles.botaoFlutuanteInner}>
          <PrimaryButton title="+ Nova tarefa" onPress={() => navigation.navigate('NovaTarefa')} />
        </View>
      </View>
    </View>
  );
}
