import React from 'react';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

import { styles } from './styles';

export default function FormTextInput({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'none',
  multiline,
}) {
  const showError = Boolean(touched && error);

  return (
    <View style={styles.wrapper}>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        error={showError}
        style={styles.input}
        outlineStyle={styles.outline}
      />
      {showError ? (
        <HelperText type="error" visible={showError}>
          {error}
        </HelperText>
      ) : null}
    </View>
  );
}
