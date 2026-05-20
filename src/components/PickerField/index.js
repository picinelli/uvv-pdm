import React, { useState, useCallback } from 'react';
import { View, Platform, Pressable } from 'react-native';
import { TextInput, HelperText, Menu } from 'react-native-paper';

import OptionPickerModal from '../OptionPickerModal';
import { styles } from './styles';

const LIMITE_OPCOES_MENU = 12;

export default function PickerField({ label, value, onValueChange, options, error, touched }) {
  const [aberto, setAberto] = useState(false);
  const [larguraCampo, setLarguraCampo] = useState(null);
  const showError = Boolean(touched && error);
  const rotuloAtual = options.find((opt) => opt.value === value)?.label ?? '';
  const usarModal = options.length > LIMITE_OPCOES_MENU;

  const abrir = () => setAberto(true);
  const fechar = () => setAberto(false);

  const handleLayoutCampo = useCallback((event) => {
    const { width } = event.nativeEvent.layout;
    setLarguraCampo(width);
  }, []);

  const estiloLarguraMenu =
    larguraCampo != null
      ? { width: larguraCampo, minWidth: larguraCampo, maxWidth: larguraCampo }
      : undefined;

  const campoLeitura = (
    <Pressable
      onPress={abrir}
      onLayout={handleLayoutCampo}
      style={styles.areaClicavel}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <TextInput
        mode="outlined"
        label={label}
        value={rotuloAtual}
        editable={false}
        showSoftInputOnFocus={false}
        error={showError}
        pointerEvents="none"
        right={<TextInput.Icon icon="menu-down" pointerEvents="none" />}
        style={styles.input}
        outlineStyle={styles.outline}
      />
    </Pressable>
  );

  if (usarModal) {
    return (
      <View style={styles.wrapper}>
        {campoLeitura}
        <OptionPickerModal
          visible={aberto}
          title={label}
          options={options}
          selectedValue={value}
          onSelect={(v) => {
            onValueChange(v);
            fechar();
          }}
          onClose={fechar}
        />
        {showError ? (
          <HelperText type="error" visible={showError}>
            {error}
          </HelperText>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Menu
        visible={aberto}
        onDismiss={fechar}
        anchor={campoLeitura}
        style={estiloLarguraMenu}
        contentStyle={estiloLarguraMenu}
      >
        {options.map((opt) => (
          <Menu.Item
            key={opt.value}
            title={opt.label}
            onPress={() => {
              onValueChange(opt.value);
              fechar();
            }}
          />
        ))}
      </Menu>
      {showError ? (
        <HelperText type="error" visible={showError}>
          {error}
        </HelperText>
      ) : null}
    </View>
  );
}
