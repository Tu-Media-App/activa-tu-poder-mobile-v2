/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { router } from 'expo-router';

import { OverlayError } from '@/components/global/OverlayError';
import { Colors, CustomFonts } from '@/constants';
import AppleButton from '@/components/global/AppleButton';
import TabSelector from '@/components/global/TabSelector';
import { useAppleRegister } from '@/hooks/auth/useAppleRegister';
import { useTermsAndConditionsStore } from '@/store';
import { EmailSignUpForm, GoogleLoginButton, TermsAndConditions } from '@/components';
import { authAlerts } from '@/constants';

enum TabVariant {
  email = 0,
  apple = 1,
  google = 2,
}

export default function RegisterScreen() {
  const { registerWithApple } = useAppleRegister();
  const areTermsAccepted = useTermsAndConditionsStore(state => state.isAccepted);

  const appleSignUp = async () => {
    const { error, credential } = await registerWithApple();
    if (error) {
      Alert.alert(...authAlerts.appleFail);
      return;
    } else if (credential?.additionalUserInfo?.isNewUser) {
      Alert.alert(...authAlerts.success);
    }
  };

  const [tab, setTab] = useState<TabVariant>(TabVariant.email);

  return (
    <View style={styles.screen}>
      <View style={styles.title}>
        <Card.Title style={styles.titleText}>Registrarse</Card.Title>
        <TouchableOpacity onPress={() => router.back()} style={styles.titleButton}>
          <Icon name="arrow-left" size={24} color={Colors.whiteBackGround} type="fontisto" />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TabSelector onChange={(value: any) => setTab(value)} value={tab} />

          {tab === TabVariant.email && <EmailSignUpForm />}
          {tab === TabVariant.google && (
            <>
              <TermsAndConditions />
              <GoogleLoginButton text="Registrarse con Google" disabled={!areTermsAccepted} />
            </>
          )}
          {tab === TabVariant.apple && (
            <>
              <TermsAndConditions />
              <AppleButton disabled={!areTermsAccepted} onPress={appleSignUp} />
            </>
          )}
        </ScrollView>
      </View>
      <OverlayError />
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
});
