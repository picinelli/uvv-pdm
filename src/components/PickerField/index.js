import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { colors } from '../../theme/colors';
import { styles } from './styles';

export default function PickerField({ label, value, onValueChange, options, error, touched }) {
  const showError = Boolean(touched && error);
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.pickerBox, showError && styles.errorBox]}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          dropdownIconColor={colors.primary}
          style={styles.picker}
        >
          {options.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>
      {showError ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
