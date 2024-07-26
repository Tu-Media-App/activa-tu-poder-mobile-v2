import React from 'react';
import { Input, Card } from '@rneui/themed';
import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';
import Button from '@/components/global/Button';
import { useLogin } from '@/hooks';
import { CustomFonts } from '@/constants/Styles';
import { useLoadingStore } from '@/store';

export const EmailLoginForm = () => {
  const { login, setEmail, setPassword } = useLogin();
  const [showLoader, hideLoader] = useLoadingStore(state => [state.showLoader, state.hideLoader]);

  const loginCall = async () => {
    showLoader();
    await login();
    hideLoader();
  };

  return (
    <>
      <Card.Title style={styles.titleStyle}>Iniciar Sesión</Card.Title>
      <Input
        onChangeText={text => setEmail(text)}
        containerStyle={styles.containerStyle}
        label={'Correo Electrónico'}
        labelStyle={styles.labelStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={{ color: Colors.primary }}
        renderErrorMessage={false}
        autoComplete={'email'}
        autoCapitalize="none"
        placeholder="ejemplo123@email.com"
      />
      <Input
        onChangeText={text => setPassword(text)}
        containerStyle={styles.containerStyle}
        label="Contraseña"
        labelStyle={styles.labelStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={{ color: Colors.primary }}
        renderErrorMessage={false}
        autoComplete={'password'}
        secureTextEntry
        returnKeyType="go"
        autoCapitalize="none"
        placeholder={'* * * * *'}
      />
      <Button onPress={loginCall}>Entrar</Button>
    </>
  );
};

const styles = StyleSheet.create({
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
  titleStyle: {
    fontFamily: CustomFonts.MontserratRegular,
    color: Colors.primary,
    fontSize: 18,
    marginTop: 15,
  },
});
