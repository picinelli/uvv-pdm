import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { colors } from '../../theme/colors';
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
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          showError && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {showError ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
