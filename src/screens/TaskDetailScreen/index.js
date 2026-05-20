import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';

import ScreenContainer from '../../components/ScreenContainer';
import PrimaryButton from '../../components/PrimaryButton';
import TaskTags from '../../components/TaskTags';
import { fetchTaskById } from '../../services/api';
import { colors } from '../../theme/colors';
import { useTasks } from '../../contexts/TaskContext';
import { useUser } from '../../contexts/UserContext';
import { formatarDataBR, obterDataTarefa } from '../../utils/dates';
import { styles } from './styles';

export default function TaskDetailScreen({ route, navigation }) {
  const { taskId } = route.params ?? {};
  const { tarefas, excluir, atualizar } = useTasks();
  const { usuarioId } = useUser();
  const [tarefa, setTarefa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [excluindo, setExcluindo] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    if (!taskId) {
      setErro('Tarefa não informada.');
      setTarefa(null);
      setLoading(false);
      return;
    }

    const naLista = tarefas.find((t) => t.id === taskId);
    if (naLista) {
      setTarefa(naLista);
      setErro(null);
      setLoading(false);
      return;
    }

    let cancelado = false;
    setLoading(true);
    setErro(null);
    setTarefa(null);

    (async () => {
      try {
        const data = await fetchTaskById(taskId);
        if (!cancelado) setTarefa(data);
      } catch (e) {
        if (!cancelado) {
          setErro(e.message);
          setTarefa(null);
        }
      } finally {
        if (!cancelado) setLoading(false);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [taskId, tarefas]);

  useEffect(() => {
    if (tarefa && usuarioId && tarefa.usuario_id !== usuarioId) {
      setErro('Você não tem permissão para ver esta tarefa.');
      setTarefa(null);
    }
  }, [tarefa, usuarioId]);

  if (loading) {
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color={colors.primary} style={styles.loading} />
      </ScreenContainer>
    );
  }

  if (erro || !tarefa) {
    return (
      <ScreenContainer>
        <Text style={styles.titulo}>Tarefa indisponível</Text>
        <Text style={styles.erro}>{erro ?? 'Tarefa não encontrada.'}</Text>
        <PrimaryButton title="Voltar" onPress={() => navigation.goBack()} />
      </ScreenContainer>
    );
  }

  const dataTarefa = formatarDataBR(obterDataTarefa(tarefa));
  const criadaEm = tarefa.created_at
    ? new Date(tarefa.created_at).toLocaleString('pt-BR')
    : '';

  const handleAtualizarCampo = async (patch) => {
    setAtualizando(true);
    try {
      const atualizada = await atualizar(tarefa.id, patch);
      if (atualizada) setTarefa(atualizada);
    } catch (e) {
      Alert.alert('Erro', e.message);
    } finally {
      setAtualizando(false);
    }
  };

  const handleExcluir = () => {
    Alert.alert(
      'Excluir tarefa',
      `Deseja excluir "${tarefa.titulo}"? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setExcluindo(true);
            try {
              await excluir(tarefa.id);
              navigation.navigate('Tarefas');
            } catch (e) {
              Alert.alert('Erro', e.message);
            } finally {
              setExcluindo(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      <Text style={styles.titulo}>{tarefa.titulo}</Text>
      <Text style={styles.data}>Data da tarefa: {dataTarefa}</Text>
      {criadaEm ? <Text style={styles.data}>Criada em {criadaEm}</Text> : null}

      <TaskTags
        tarefa={tarefa}
        onStatusChange={(status) => handleAtualizarCampo({ status })}
        onPrioridadeChange={(prioridade) => handleAtualizarCampo({ prioridade })}
        disabled={atualizando || excluindo}
      />

      <Text style={styles.label}>Descrição</Text>
      <Text style={styles.descricao}>
        {tarefa.descricao?.trim() ? tarefa.descricao : 'Sem descrição.'}
      </Text>

      <View style={styles.botoes}>
        <PrimaryButton title="Voltar para a lista" onPress={() => navigation.goBack()} />
        <PrimaryButton
          title="Excluir tarefa"
          variant="danger"
          loading={excluindo}
          disabled={excluindo}
          onPress={handleExcluir}
        />
      </View>
    </ScreenContainer>
  );
}
