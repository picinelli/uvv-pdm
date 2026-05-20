import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  filtros: {
    marginBottom: 4,
  },
  listaFlex: {
    flex: 1,
  },
  lista: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  carregando: {
    flex: 1,
    paddingHorizontal: 0,
  },
  loading: {
    marginTop: 40,
  },
  erro: {
    color: colors.error,
    marginBottom: 10,
  },
  botaoFlutuante: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  botaoCadastro: {
    paddingHorizontal: 20,
  },
});
