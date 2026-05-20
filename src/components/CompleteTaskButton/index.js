import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import PrimaryButton from '../PrimaryButton';
import { colors } from '../../theme/colors';
import { styles } from './styles';

export default function CompleteTaskButton({
  concluida,
  onPress,
  loading = false,
  disabled = false,
  compact = false,
}) {
  const bloqueado = disabled || loading;

  if (concluida) {
    return (
      <View style={[styles.concluidaBadge, compact && styles.concluidaBadgeCompact]}>
        <Text style={styles.concluidaTexto}>Concluída</Text>
      </View>
    );
  }

  if (compact) {
    return (
      <TouchableOpacity
        style={[styles.compact, bloqueado && styles.disabled]}
        onPress={onPress}
        disabled={bloqueado}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel="Marcar como concluída"
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.secondary} />
        ) : (
          <Text style={styles.compactTexto}>Concluir</Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <PrimaryButton
      title="Marcar como concluída"
      variant="secondary"
      onPress={onPress}
      loading={loading}
      disabled={bloqueado}
    />
  );
}
