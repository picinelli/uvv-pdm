import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { colors } from '../../theme/colors';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  lista: {
    flexGrow: 0,
  },
  opcao: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  opcaoSelecionada: {
    backgroundColor: '#EEF2FF',
  },
  opcaoTexto: {
    fontSize: 16,
    color: colors.text,
  },
  opcaoTextoSelecionado: {
    fontWeight: '700',
    color: colors.primary,
  },
  cancelar: {
    marginTop: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelarTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textMuted,
  },
});

export default function OptionPickerModal({
  visible,
  title,
  options,
  selectedValue,
  onSelect,
  onClose,
}) {
  const { height } = useWindowDimensions();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.sheet} onStartShouldSetResponder={() => true}>
          <Text style={styles.titulo}>{title}</Text>
          <ScrollView
            style={[styles.lista, { maxHeight: height * 0.45 }]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
          >
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
          </ScrollView>
          <TouchableOpacity style={styles.cancelar} onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.cancelarTexto}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}
