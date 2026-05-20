import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ScreenContainer from '../../components/ScreenContainer';
import FormTextInput from '../../components/FormTextInput';
import PrimaryButton from '../../components/PrimaryButton';
import { signInUser } from '../../services/api';
import { styles } from './styles';

const schema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('Informe seu e-mail'),
  senha: Yup.string().min(6, 'Mínimo de 6 caracteres').required('Informe sua senha'),
});

const valoresIniciais = { email: '', senha: '' };

export default function LoginScreen({ navigation, route }) {
  const [erro, setErro] = useState(null);
  const cadastroOk = route.params?.cadastroOk;

  async function handleSubmit(values, { setSubmitting }) {
    setErro(null);
    try {
      await signInUser({
        email: values.email.trim().toLowerCase(),
        senha: values.senha,
      });
    } catch (e) {
      setErro(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScreenContainer>
      <Text style={styles.titulo}>Entrar</Text>
      <Text style={styles.subtitulo}>
        Acesse sua conta para ver suas tarefas.
      </Text>

      {cadastroOk ? (
        <Text style={styles.sucesso}>
          Cadastro criado! Confirme o e-mail enviado para sua caixa de entrada antes de fazer login.
        </Text>
      ) : null}

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
              label="E-mail"
              placeholder="voce@email.com"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
            />

            <FormTextInput
              label="Senha"
              placeholder="Sua senha"
              value={values.senha}
              onChangeText={handleChange('senha')}
              onBlur={handleBlur('senha')}
              error={errors.senha}
              touched={touched.senha}
              secureTextEntry
            />

            {erro ? <Text style={styles.erro}>{erro}</Text> : null}

            <View style={styles.botao}>
              <PrimaryButton
                title="Entrar"
                onPress={submit}
                loading={isSubmitting}
                disabled={!isValid || !dirty}
              />
            </View>

            <TouchableOpacity
              style={styles.linkCadastro}
              onPress={() => navigation.navigate('Cadastro')}
            >
              <Text style={styles.linkTexto}>
                Não tem conta? <Text style={styles.linkDestaque}>Criar conta</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScreenContainer>
  );
}
