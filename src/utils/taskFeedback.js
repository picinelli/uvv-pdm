import { showAlert } from './alert';

export function notificarTarefaConcluida(statusAnterior, novoStatus) {
  if (novoStatus === 'concluida' && statusAnterior !== 'concluida') {
    showAlert('Parabéns!', 'Parabéns por concluir mais uma tarefa, continue assim!');
  }
}
