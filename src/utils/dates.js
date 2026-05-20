export function hojeISO() {
  return paraISO(new Date());
}

export function paraISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatarDataBR(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

export function obterDataTarefa(tarefa) {
  if (tarefa?.data_tarefa) return tarefa.data_tarefa;
  if (tarefa?.created_at) return tarefa.created_at.slice(0, 10);
  return hojeISO();
}

export function ordenarTarefasPorData(tarefas) {
  return [...tarefas].sort((a, b) => {
    const cmpData = obterDataTarefa(a).localeCompare(obterDataTarefa(b));
    if (cmpData !== 0) return cmpData;
    return (b.created_at ?? '').localeCompare(a.created_at ?? '');
  });
}

export function gerarOpcoesDataTarefa(quantidadeFutura = 60) {
  const opcoes = [];
  const base = new Date();
  base.setHours(12, 0, 0, 0);

  for (let i = 0; i <= quantidadeFutura; i += 1) {
    const dia = new Date(base);
    dia.setDate(base.getDate() + i);
    const valor = paraISO(dia);
    const rotulo = i === 0 ? `Hoje (${formatarDataBR(valor)})` : formatarDataBR(valor);
    opcoes.push({ label: rotulo, value: valor });
  }

  return opcoes;
}

export function tarefaNaData(tarefa, dataISO) {
  return obterDataTarefa(tarefa) === dataISO;
}
