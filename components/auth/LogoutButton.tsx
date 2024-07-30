import React from 'react';

import { Text } from '@rneui/themed';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { useLogout } from '@/hooks';
import { Colors, CustomFonts } from '@/constants';

export const LogoutButton = () => {
  const { logout } = useLogout();
  return (
    <TouchableOpacity onPress={logout} style={[styles.button, styles.negative]}>
      <Text style={styles.buttonText}>Cerrar Sesión</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginHorizontal: '5%',
    marginBottom: 10,
    width: 250,
    height: 50,
    borderRadius: 15,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.whiteBackGround,
    fontFamily: CustomFonts.MontserratBold,
  },
  negative: { backgroundColor: Colors.secondary },
});
