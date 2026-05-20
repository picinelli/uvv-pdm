import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import OptionPickerModal from '../OptionPickerModal';
import { OPCOES_STATUS, OPCOES_PRIORIDADE, STATUS_LABEL, PRIORIDADE_LABEL } from '../../constants/taskOptions';
import { statusColors, priorityColors } from '../../theme/colors';
import { styles } from './styles';

export default function TaskTags({
  tarefa,
  onStatusChange,
  onPrioridadeChange,
  disabled = false,
}) {
  const [picker, setPicker] = useState(null);

  const fecharPicker = () => setPicker(null);

  const abrirStatus = () => {
    if (disabled || !onStatusChange) return;
    setPicker({ tipo: 'status', titulo: 'Alterar status', valor: tarefa.status });
  };

  const abrirPrioridade = () => {
    if (disabled || !onPrioridadeChange) return;
    setPicker({ tipo: 'prioridade', titulo: 'Alterar prioridade', valor: tarefa.prioridade });
  };

  const handleSelect = (valor) => {
    if (!picker) return;
    fecharPicker();
    if (picker.tipo === 'status' && valor !== tarefa.status) {
      onStatusChange(valor);
      return;
    }
    if (picker.tipo === 'prioridade' && valor !== tarefa.prioridade) {
      onPrioridadeChange(valor);
    }
  };

  const opcoes = picker?.tipo === 'status' ? OPCOES_STATUS : OPCOES_PRIORIDADE;
  const editavel = !disabled && (onStatusChange || onPrioridadeChange);

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.tagsRow}>
        <TouchableOpacity
          style={[styles.tag, { backgroundColor: statusColors[tarefa.status] }]}
          onPress={abrirStatus}
          disabled={!editavel || !onStatusChange}
          activeOpacity={editavel && onStatusChange ? 0.7 : 1}
          accessibilityRole="button"
          accessibilityLabel="Alterar status"
        >
          <Text style={styles.tagText}>{STATUS_LABEL[tarefa.status] ?? tarefa.status}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tag, { backgroundColor: priorityColors[tarefa.prioridade] }]}
          onPress={abrirPrioridade}
          disabled={!editavel || !onPrioridadeChange}
          activeOpacity={editavel && onPrioridadeChange ? 0.7 : 1}
          accessibilityRole="button"
          accessibilityLabel="Alterar prioridade"
        >
          <Text style={styles.tagText}>
            {PRIORIDADE_LABEL[tarefa.prioridade] ?? tarefa.prioridade}
          </Text>
        </TouchableOpacity>
        </View>
      </View>

      <OptionPickerModal
        visible={picker !== null}
        title={picker?.titulo ?? ''}
        options={opcoes}
        selectedValue={picker?.valor}
        onSelect={handleSelect}
        onClose={fecharPicker}
      />
    </>
  );
}
