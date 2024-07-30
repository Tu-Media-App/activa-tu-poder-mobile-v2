import React from 'react';
import { Text } from '@rneui/themed';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors, CustomFonts } from '@/constants';
import { useDeleteUser, useLogout } from '@/hooks';
import { useAuthStore } from '@/store';

export const DeleteAccountButton = () => {
  const [currentUser] = useAuthStore(state => [state.firebaseUser]);
  const { logout } = useLogout();
  const { deleteUser } = useDeleteUser();

  const onDelete = () => {
    Alert.alert('Confirmar eliminación', 'Si eliminas tu perfil no podrás acceder a menos que te registres de nuevo', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          if (currentUser) await deleteUser(currentUser);
          logout();
        },
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={onDelete} style={[styles.button, { backgroundColor: 'red' }]}>
      <Text style={styles.buttonText}>Eliminar mi cuenta</Text>
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
});
