import { authAlerts, Colors, CustomFonts } from '@/constants';
import { Card, Icon } from '@rneui/themed';
import React from 'react';
import { router } from 'expo-router';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '@/components/global/Button';
import { useForm } from 'react-hook-form';
import TextInput from '@/components/global/TextInput';
import { RecoverPassword } from '@/types';
import { useAuthErrorHandler, useRecoverPassword } from '@/hooks';
import { useLoadingStore } from '@/store';
import { OverlayError } from '@/components';

export default function ForgotPasswordScreen() {
  const form = useForm<RecoverPassword>({ mode: 'all' });
  const { sendRecoverMail } = useRecoverPassword();
  const { handleAuthError } = useAuthErrorHandler();
  const [showLoader, hideLoader] = useLoadingStore(state => [state.showLoader, state.hideLoader]);

  const submit = async (fields: RecoverPassword) => {
    showLoader();
    const { error } = await sendRecoverMail(fields.email);
    hideLoader();
    handleAuthError(error, authAlerts.recoverPasswordSuccess);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.title}>
        <Card.Title style={styles.titleText}>Recuperar Contraseña</Card.Title>
        <TouchableOpacity onPress={() => router.back()} style={styles.titleButton}>
          <Icon name="arrow-left" size={24} color={Colors.whiteBackGround} type="fontisto" />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <TextInput
          name="email"
          control={form.control}
          rules={{ required: 'Campo requerido' }}
          label={'Correo Electrónico'}
          autoComplete={'email'}
          autoCapitalize="none"
          placeholder="ejemplo123@email.com"
        />
        <Button onPress={form.handleSubmit(submit, (error: any) => console.warn(error))}>Enviar Correo</Button>
        <OverlayError />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary,
  },
  title: { marginVertical: 20, display: 'flex', justifyContent: 'center' },
  titleText: {
    fontFamily: CustomFonts.MontserratRegular,
    color: Colors.whiteBackGround,
    fontSize: 18,
    marginBottom: 0,
    textAlignVertical: 'center',
  },
  titleButton: { paddingVertical: 10, paddingHorizontal: 30, position: 'absolute' },
  card: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.whiteBackGround,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 400,
  },
  containerStyle: {
    borderRadius: 10,
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: Colors.whiteBackGround,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  inputContainerStyle: {
    borderBottomWidth: 0, // mandatory to override rneui default
    fontFamily: CustomFonts.MontserratRegular,
  },
  labelStyle: {
    color: Colors.primary,
    fontFamily: CustomFonts.MontserratBold,
  },
});
