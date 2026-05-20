import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

import OptionPickerModal from '../OptionPickerModal';
import { styles } from './styles';

export default function PickerField({ label, value, onValueChange, options, error, touched }) {
  const [aberto, setAberto] = useState(false);
  const showError = Boolean(touched && error);
  const rotuloAtual = options.find((opt) => opt.value === value)?.label ?? '';

  const abrir = () => setAberto(true);
  const fechar = () => setAberto(false);

  const handleSelect = (v) => {
    onValueChange(v);
    fechar();
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={abrir}
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

      <OptionPickerModal
        visible={aberto}
        title={label}
        options={options}
        selectedValue={value}
        onSelect={handleSelect}
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
