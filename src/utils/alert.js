import { Alert, Platform } from 'react-native';

export function showAlert(title, message, buttons) {
  if (Platform.OS === 'web') {
    if (typeof window === 'undefined') return;

    const texto = [title, message].filter(Boolean).join('\n\n');

    if (!buttons || buttons.length === 0) {
      window.alert(texto);
      return;
    }

    if (buttons.length === 1) {
      window.alert(texto);
      buttons[0].onPress?.();
      return;
    }

    const confirmou = window.confirm(texto);
    if (confirmou) {
      const acao = buttons.find((b) => b.style === 'destructive') ?? buttons.find((b) => b.style !== 'cancel');
      acao?.onPress?.();
    } else {
      buttons.find((b) => b.style === 'cancel')?.onPress?.();
    }
    return;
  }

  if (buttons && buttons.length > 0) {
    Alert.alert(title, message, buttons);
    return;
  }

  Alert.alert(title, message);
}
