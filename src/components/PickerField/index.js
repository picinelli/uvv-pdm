import React, { useState, useCallback } from 'react';
import { View, Platform, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput, HelperText, Menu } from 'react-native-paper';

import { styles } from './styles';

export default function PickerField({ label, value, onValueChange, options, error, touched }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [larguraCampo, setLarguraCampo] = useState(null);
  const showError = Boolean(touched && error);
  const rotuloAtual = options.find((opt) => opt.value === value)?.label ?? '';

  const usarMenu = Platform.OS === 'web' || options.length <= 12;

  const abrirMenu = () => setMenuAberto(true);

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
      onPress={abrirMenu}
      onLayout={handleLayoutCampo}
      style={styles.areaClicavel}
      accessibilityRole="button"
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

  if (usarMenu) {
    return (
      <View style={styles.wrapper}>
        <Menu
          visible={menuAberto}
          onDismiss={() => setMenuAberto(false)}
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
                setMenuAberto(false);
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

  return (
    <View style={styles.wrapper}>
      <View style={styles.campoNativo}>
        <TextInput
          mode="outlined"
          label={label}
          value={rotuloAtual}
          editable={false}
          error={showError}
          style={styles.input}
          outlineStyle={styles.outline}
          pointerEvents="none"
        />
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.pickerSobreposto}
          dropdownIconColor="transparent"
          mode="dropdown"
        >
          {options.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>
      {showError ? (
        <HelperText type="error" visible={showError}>
          {error}
        </HelperText>
      ) : null}
    </View>
  );
}
