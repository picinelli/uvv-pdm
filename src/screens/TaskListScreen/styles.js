import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';
import { WEB_CONTENT_MAX_WIDTH } from '../../theme/webLayout';
import { webContentWidth } from '../../utils/webLayout';

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
    ...webContentWidth,
  },
  botaoFlutuante: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  botaoFlutuanteInner: {
    width: '100%',
    maxWidth: WEB_CONTENT_MAX_WIDTH,
  },
  botaoCadastro: {
    paddingHorizontal: 20,
  },
});
