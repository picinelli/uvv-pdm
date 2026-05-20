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

const MAX_LARGURA_DIALOGO = 420;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dialogo: {
    width: '100%',
    maxWidth: MAX_LARGURA_DIALOGO,
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
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
    paddingVertical: 12,
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
    paddingVertical: 12,
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
  const alturaLista = Math.min(options.length * 48, height * 0.55);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.dialogo} onStartShouldSetResponder={() => true}>
          <Text style={styles.titulo}>{title}</Text>
          <ScrollView
            style={[styles.lista, { maxHeight: alturaLista }]}
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
