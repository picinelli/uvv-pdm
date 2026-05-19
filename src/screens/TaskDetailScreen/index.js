import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import ScreenContainer from '../../components/ScreenContainer';
import PrimaryButton from '../../components/PrimaryButton';
import { fetchTaskById } from '../../services/api';
import { colors, statusColors, priorityColors } from '../../theme/colors';
import { useTasks } from '../../contexts/TaskContext';
import { styles } from './styles';

const STATUS_LABEL = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
};
const PRIORIDADE_LABEL = { baixa: 'Baixa', media: 'Média', alta: 'Alta' };

export default function TaskDetailScreen({ route, navigation }) {
  const { taskId } = route.params ?? {};
  const { tarefas } = useTasks();
  const [tarefa, setTarefa] = useState(() => tarefas.find((t) => t.id === taskId) ?? null);
  const [loading, setLoading] = useState(!tarefa);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!taskId) {
      setErro('Tarefa não informada.');
      setLoading(false);
      return;
    }
    if (tarefa) return;
    (async () => {
      try {
        const data = await fetchTaskById(taskId);
        setTarefa(data);
      } catch (e) {
        setErro(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [taskId, tarefa]);

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

  const dataFormatada = tarefa.created_at
    ? new Date(tarefa.created_at).toLocaleString('pt-BR')
    : '';

  return (
    <ScreenContainer>
      <Text style={styles.titulo}>{tarefa.titulo}</Text>
      <Text style={styles.data}>Criada em {dataFormatada}</Text>

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

      <Text style={styles.label}>Descrição</Text>
      <Text style={styles.descricao}>
        {tarefa.descricao?.trim() ? tarefa.descricao : 'Sem descrição.'}
      </Text>

      <View style={styles.botao}>
        <PrimaryButton title="Voltar para a lista" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
}
