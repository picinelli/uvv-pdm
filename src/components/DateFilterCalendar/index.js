import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { formatarDataBR, hojeISO, paraISO } from '../../utils/dates';
import { colors } from '../../theme/colors';
import { styles } from './styles';

const DIAS_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

function inicioDoMes(ano, mes) {
  return new Date(ano, mes, 1, 12, 0, 0, 0);
}

function diasNoMes(ano, mes) {
  return new Date(ano, mes + 1, 0).getDate();
}

function indiceSegundaFeira(date) {
  return (date.getDay() + 6) % 7;
}

export default function DateFilterCalendar({ selectedDate, onSelectDate, markedDates = [] }) {
  const hoje = hojeISO();
  const [mesVisivel, setMesVisivel] = useState(() => {
    const [y, m] = (selectedDate || hoje).split('-').map(Number);
    return inicioDoMes(y, m - 1);
  });

  const marcas = useMemo(() => new Set(markedDates), [markedDates]);

  const ano = mesVisivel.getFullYear();
  const mes = mesVisivel.getMonth();
  const totalDias = diasNoMes(ano, mes);
  const offset = indiceSegundaFeira(inicioDoMes(ano, mes));

  const celulas = useMemo(() => {
    const lista = [];
    for (let i = 0; i < offset; i += 1) lista.push(null);
    for (let dia = 1; dia <= totalDias; dia += 1) {
      lista.push(paraISO(new Date(ano, mes, dia, 12, 0, 0, 0)));
    }
    return lista;
  }, [ano, mes, offset, totalDias]);

  const irMesAnterior = () => {
    setMesVisivel((atual) => inicioDoMes(atual.getFullYear(), atual.getMonth() - 1));
  };

  const irMesProximo = () => {
    setMesVisivel((atual) => inicioDoMes(atual.getFullYear(), atual.getMonth() + 1));
  };

  const irParaHoje = () => {
    const [y, m] = hoje.split('-').map(Number);
    setMesVisivel(inicioDoMes(y, m - 1));
    onSelectDate(hoje);
  };

  const selecionadoEhHoje = selectedDate === hoje;

  return (
    <View style={styles.wrapper}>
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={irMesAnterior} style={styles.navBotao} accessibilityLabel="Mês anterior">
          <Text style={styles.navTexto}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.mesTitulo}>
          {MESES[mes]} {ano}
        </Text>
        <TouchableOpacity onPress={irMesProximo} style={styles.navBotao} accessibilityLabel="Próximo mês">
          <Text style={styles.navTexto}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.semanaRow}>
        {DIAS_SEMANA.map((dia) => (
          <Text key={dia} style={styles.diaSemana}>
            {dia}
          </Text>
        ))}
      </View>

      <View style={styles.grade}>
        {celulas.map((iso, index) => {
          if (!iso) {
            return <View key={`vazio-${index}`} style={styles.celula} />;
          }

          const diaNumero = Number(iso.split('-')[2]);
          const selecionado = iso === selectedDate;
          const ehHoje = iso === hoje;
          const temTarefa = marcas.has(iso);

          return (
            <TouchableOpacity
              key={iso}
              style={[
                styles.celula,
                selecionado && styles.celulaSelecionada,
                ehHoje && !selecionado && styles.celulaHoje,
              ]}
              onPress={() => onSelectDate(iso)}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel={`Dia ${diaNumero}`}
            >
              <Text
                style={[
                  styles.diaNumero,
                  selecionado && styles.diaNumeroSelecionado,
                  ehHoje && !selecionado && styles.diaNumeroHoje,
                ]}
              >
                {diaNumero}
              </Text>
              {temTarefa ? (
                <View style={[styles.marcador, selecionado && styles.marcadorSelecionado]} />
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.rodape}>
        <Text style={styles.dataSelecionada}>{formatarDataBR(selectedDate)}</Text>
        {!selecionadoEhHoje ? (
          <TouchableOpacity onPress={irParaHoje} activeOpacity={0.75}>
            <Text style={styles.botaoHoje}>Ir para hoje</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
