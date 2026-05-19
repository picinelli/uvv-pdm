import React from 'react';
import { ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';

import { styles } from './styles';

export default function ScreenContainer({ children, scroll = true }) {
  const Content = scroll ? ScrollView : View;
  const contentProps = scroll
    ? { contentContainerStyle: styles.content, keyboardShouldPersistTaps: 'handled' }
    : { style: styles.content };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Content {...contentProps}>{children}</Content>
    </KeyboardAvoidingView>
  );
}
