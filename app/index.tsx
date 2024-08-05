import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Card } from '@rneui/themed';

import { CustomFonts, Colors } from '@/constants';
import { router } from 'expo-router';
import { AppleLoginButton, EmailLoginForm, GoogleLoginButton, OverlayError, Separator } from '@/components';
import { useAuthStore } from '@/store';

export default function LoginScreen() {
  const [firebaseUser, user] = useAuthStore(state => [state.firebaseUser, state.user]);

  useEffect(() => {
    if (user && firebaseUser) {
      router.push('/profile');
    }
  }, [user, firebaseUser]);

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View style={styles.screen}>
          <Card containerStyle={styles.card}>
            <EmailLoginForm />
            <Separator />
            <AppleLoginButton />
            <GoogleLoginButton text="Entrar con Google" disabled={false} />
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => router.push('/auth/forgotPassword')}>
                <Text style={styles.boldLink}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/auth/register')}>
                <Text style={styles.footerText}>¿Aún no tienes cuenta?</Text>
                <Text style={styles.boldLink}>Regístrate Aquí...</Text>
              </TouchableOpacity>
            </View>
          </Card>
          <OverlayError />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    backgroundColor: Colors.primary,
  },
  card: {
    width: '100%',
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingBottom: 120,
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
  footer: { paddingVertical: 30, marginBottom: 60 },
  footerText: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: CustomFonts.MontserratRegular,
    color: Colors.primary,
  },
  boldLink: {
    color: Colors.primary,
    textAlign: 'center',
    fontFamily: CustomFonts.MontserratBold,
  },
});
