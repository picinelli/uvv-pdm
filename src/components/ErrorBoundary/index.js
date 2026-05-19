import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (__DEV__) console.log('[ErrorBoundary]', error, info);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.titulo}>Algo deu errado</Text>
          <Text style={styles.mensagem}>{String(this.state.error.message ?? this.state.error)}</Text>
          <TouchableOpacity style={styles.botao} onPress={this.reset}>
            <Text style={styles.botaoTexto}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}
