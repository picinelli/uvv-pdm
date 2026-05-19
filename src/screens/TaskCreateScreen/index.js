import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ScreenContainer from '../../components/ScreenContainer';
import FormTextInput from '../../components/FormTextInput';
import PickerField from '../../components/PickerField';
import PrimaryButton from '../../components/PrimaryButton';
import { useUser } from '../../contexts/UserContext';
import { useTasks } from '../../contexts/TaskContext';
import { styles } from './styles';

const OPCOES_STATUS = [
  { label: 'Pendente', value: 'pendente' },
  { label: 'Em andamento', value: 'em_andamento' },
  { label: 'Concluída', value: 'concluida' },
];

const OPCOES_PRIORIDADE = [
  { label: 'Baixa', value: 'baixa' },
  { label: 'Média', value: 'media' },
  { label: 'Alta', value: 'alta' },
];

const schema = Yup.object({
  titulo: Yup.string().trim().min(3, 'Mínimo de 3 caracteres').required('Informe um título'),
  descricao: Yup.string().notRequired(),
  status: Yup.string().oneOf(['pendente', 'em_andamento', 'concluida']).required(),
  prioridade: Yup.string().oneOf(['baixa', 'media', 'alta']).required(),
});

const valoresIniciais = {
  titulo: '',
  descricao: '',
  status: 'pendente',
  prioridade: 'media',
};

export default function TaskCreateScreen({ navigation }) {
  const { usuario } = useUser();
  const { adicionar } = useTasks();
  const [erro, setErro] = useState(null);

  if (!usuario) {
    return (
      <ScreenContainer>
        <Text style={styles.titulo}>Nova tarefa</Text>
        <Text style={styles.aviso}>
          Você precisa estar cadastrado para criar uma tarefa.
        </Text>
        <PrimaryButton title="Ir para cadastro" onPress={() => navigation.navigate('Cadastro')} />
      </ScreenContainer>
    );
  }

  async function handleSubmit(values, { setSubmitting, resetForm }) {
    setErro(null);
    try {
      await adicionar({
        titulo: values.titulo.trim(),
        descricao: values.descricao.trim(),
        status: values.status,
        prioridade: values.prioridade,
      });
      resetForm();
      Alert.alert('Tarefa criada', 'Sua tarefa foi salva com sucesso.', [
        { text: 'Ver tarefas', onPress: () => navigation.navigate('Tarefas') },
      ]);
    } catch (e) {
      setErro(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScreenContainer>
      <Text style={styles.titulo}>Nova tarefa</Text>
      <Text style={styles.subtitulo}>Preencha os dados abaixo para criar uma tarefa.</Text>

      <Formik initialValues={valoresIniciais} validationSchema={schema} onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit: submit,
          values,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
          isValid,
          dirty,
        }) => (
          <View>
            <FormTextInput
              label="Título *"
              placeholder="Ex.: Estudar para a prova"
              value={values.titulo}
              onChangeText={handleChange('titulo')}
              onBlur={handleBlur('titulo')}
              error={errors.titulo}
              touched={touched.titulo}
              autoCapitalize="sentences"
            />

            <FormTextInput
              label="Descrição"
              placeholder="Detalhes da tarefa (opcional)"
              value={values.descricao}
              onChangeText={handleChange('descricao')}
              onBlur={handleBlur('descricao')}
              error={errors.descricao}
              touched={touched.descricao}
              multiline
              autoCapitalize="sentences"
            />

            <PickerField
              label="Status"
              value={values.status}
              onValueChange={(v) => setFieldValue('status', v)}
              options={OPCOES_STATUS}
            />

            <PickerField
              label="Prioridade"
              value={values.prioridade}
              onValueChange={(v) => setFieldValue('prioridade', v)}
              options={OPCOES_PRIORIDADE}
            />

            {erro ? <Text style={styles.erro}>{erro}</Text> : null}

            <View style={styles.botao}>
              <PrimaryButton
                title="Salvar tarefa"
                onPress={submit}
                loading={isSubmitting}
                disabled={!isValid || !dirty}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScreenContainer>
  );
}
