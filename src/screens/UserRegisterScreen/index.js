import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ScreenContainer from '../../components/ScreenContainer';
import FormTextInput from '../../components/FormTextInput';
import PrimaryButton from '../../components/PrimaryButton';
import { createUser } from '../../services/api';
import { useUser } from '../../contexts/UserContext';
import { styles } from './styles';

const schema = Yup.object({
  nome: Yup.string().trim().min(3, 'Mínimo de 3 caracteres').required('Informe seu nome'),
  email: Yup.string().email('E-mail inválido').required('Informe seu e-mail'),
  telefone: Yup.string()
    .matches(/^\d*$/, 'Apenas dígitos')
    .min(10, 'Mínimo de 10 dígitos')
    .max(11, 'Máximo de 11 dígitos')
    .notRequired(),
  senha: Yup.string().min(6, 'Mínimo de 6 caracteres').required('Informe uma senha'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'As senhas não conferem')
    .required('Confirme sua senha'),
});

const valoresIniciais = {
  nome: '',
  email: '',
  telefone: '',
  senha: '',
  confirmarSenha: '',
};

export default function UserRegisterScreen({ navigation }) {
  const { setUsuario } = useUser();
  const [erroApi, setErroApi] = useState(null);

  async function handleSubmit(values, { setSubmitting, resetForm }) {
    setErroApi(null);
    try {
      const novo = await createUser({
        nome: values.nome.trim(),
        email: values.email.trim().toLowerCase(),
        telefone: values.telefone.trim(),
      });
      setUsuario(novo);
      resetForm();
      Alert.alert('Cadastro concluído', `Bem-vindo(a), ${novo.nome}!`, [
        { text: 'Ver tarefas', onPress: () => navigation.navigate('Tarefas') },
      ]);
    } catch (e) {
      setErroApi(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScreenContainer>
      <Text style={styles.titulo}>Criar conta</Text>
      <Text style={styles.subtitulo}>
        Cadastre-se para começar a gerenciar suas tarefas.
      </Text>

      <Formik
        initialValues={valoresIniciais}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit: submit,
          values,
          errors,
          touched,
          isSubmitting,
          isValid,
          dirty,
        }) => (
          <View>
            <FormTextInput
              label="Nome completo *"
              placeholder="Seu nome"
              value={values.nome}
              onChangeText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              error={errors.nome}
              touched={touched.nome}
              autoCapitalize="words"
            />

            <FormTextInput
              label="E-mail *"
              placeholder="voce@email.com"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
            />

            <FormTextInput
              label="Telefone (opcional)"
              placeholder="11999998888"
              value={values.telefone}
              onChangeText={handleChange('telefone')}
              onBlur={handleBlur('telefone')}
              error={errors.telefone}
              touched={touched.telefone}
              keyboardType="phone-pad"
            />

            <FormTextInput
              label="Senha *"
              placeholder="Mínimo 6 caracteres"
              value={values.senha}
              onChangeText={handleChange('senha')}
              onBlur={handleBlur('senha')}
              error={errors.senha}
              touched={touched.senha}
              secureTextEntry
            />

            <FormTextInput
              label="Confirmar senha *"
              placeholder="Repita a senha"
              value={values.confirmarSenha}
              onChangeText={handleChange('confirmarSenha')}
              onBlur={handleBlur('confirmarSenha')}
              error={errors.confirmarSenha}
              touched={touched.confirmarSenha}
              secureTextEntry
            />

            {erroApi ? <Text style={styles.erroApi}>{erroApi}</Text> : null}

            <View style={styles.botao}>
              <PrimaryButton
                title="Cadastrar"
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
