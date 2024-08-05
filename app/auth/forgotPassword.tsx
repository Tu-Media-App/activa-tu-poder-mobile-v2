import { Colors, CustomFonts } from '@/constants';
import { Card, Icon, Input } from '@rneui/themed';
import React from 'react';
import { router } from 'expo-router';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '@/components/global/Button';

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.title}>
        <Card.Title style={styles.titleText}>Recuperar Contraseña</Card.Title>
        <TouchableOpacity onPress={() => router.back()} style={styles.titleButton}>
          <Icon name="arrow-left" size={24} color={Colors.whiteBackGround} type="fontisto" />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Input
          onChangeText={text => {}}
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
        <Button onPress={() => {}}>Enviar Correo</Button>
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
