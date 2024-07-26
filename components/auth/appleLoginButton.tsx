import React from 'react';
import appleAuth, { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { useAppleRegister } from '@/hooks';
import Button from '@/components/global/Button';

export const AppleLoginButton = () => {
  const { registerWithApple } = useAppleRegister();
  return (
    <>
      {(appleAuthAndroid.isSupported || appleAuth.isSupported) && (
        <Button
          variant="contained"
          color="black"
          icon={{
            name: 'apple1',
            type: 'antdesign',
          }}
          onPress={registerWithApple}>
          Entrar con Apple
        </Button>
      )}
    </>
  );
};
