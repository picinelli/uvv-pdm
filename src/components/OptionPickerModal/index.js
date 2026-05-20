import React from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';

import { styles } from './styles';

export default function OptionPickerModal({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <Text style={styles.titulo}>{title}</Text>
          {options.map((opt) => {
            const selecionado = opt.value === selectedValue;
            return (
              <TouchableOpacity
                key={opt.value}
                style={[styles.opcao, selecionado && styles.opcaoSelecionada]}
                onPress={() => onSelect(opt.value)}
                activeOpacity={0.7}
              >
                <Text style={[styles.opcaoTexto, selecionado && styles.opcaoTextoSelecionado]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.cancelar} onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.cancelarTexto}>Cancelar</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
