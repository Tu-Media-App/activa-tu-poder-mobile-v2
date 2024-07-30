import React from 'react';

import appleAuth, { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import Button, { ButtonProps } from '@/components/global/Button';

interface AppleButtonProps {
  onPress: ButtonProps['onPress'];
  disabled?: boolean;
}

export default function AppleButton(props: AppleButtonProps) {
  const { onPress, disabled } = props;

  if (appleAuthAndroid.isSupported || appleAuth.isSupported) {
    return (
      <Button
        disabled={disabled}
        onPress={onPress}
        variant="contained"
        color="black"
        icon={{
          name: 'apple1',
          type: 'antdesign',
        }}>
        Registrarse con Apple
      </Button>
    );
  }

  return (
    <Button
      disabled={true}
      variant="contained"
      color="black"
      icon={{
        name: 'apple1',
        type: 'antdesign',
      }}>
      {'(no disponible)'}
    </Button>
  );
}
