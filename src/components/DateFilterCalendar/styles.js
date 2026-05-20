import { Platform, StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

const CALENDAR_MAX_WIDTH = 400;

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
    ...Platform.select({
      web: {
        width: '100%',
        maxWidth: CALENDAR_MAX_WIDTH,
        alignSelf: 'center',
      },
    }),
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  navBotao: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: colors.background,
  },
  navTexto: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    lineHeight: 20,
  },
  mesTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  semanaRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  diaSemana: {
    width: '14.2857%',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  celula: {
    width: '14.2857%',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 0,
  },
  celulaSelecionada: {
    backgroundColor: colors.primary,
  },
  celulaHoje: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  diaNumero: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
  diaNumeroSelecionado: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  diaNumeroHoje: {
    color: colors.primary,
    fontWeight: '700',
  },
  marcador: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 1,
  },
  marcadorSelecionado: {
    backgroundColor: '#FFFFFF',
  },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  dataSelecionada: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  botaoHoje: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
});
