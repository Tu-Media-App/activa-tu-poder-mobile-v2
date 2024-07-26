import React from 'react';
import { useGoogleRegister } from '@/hooks';
import Button from '@/components/global/Button';
import { Colors } from '@/constants/Colors';
import { useLoadingStore } from '@/store';
import { authAlerts } from '@/constants';
import { Alert } from 'react-native';

interface GoogleLoginButtonProps {
  text: string;
  disabled: boolean;
}

export const GoogleLoginButton = (props: GoogleLoginButtonProps) => {
  const { registerWithGoogle } = useGoogleRegister();
  const [showLoader, hideLoader] = useLoadingStore(state => [state.showLoader, state.hideLoader]);

  const googleSignUp = async () => {
    showLoader();
    const { error, credential } = await registerWithGoogle();
    hideLoader();

    if (error) {
      Alert.alert(...authAlerts.googleFail);
    } else if (credential?.additionalUserInfo?.isNewUser) {
      Alert.alert(...authAlerts.success);
    }
  };

  return (
    <Button
      variant="contained"
      color={Colors.googlePrimary}
      shadowed
      icon={{
        name: 'google',
        type: 'antdesign',
      }}
      disabled={props.disabled}
      onPress={googleSignUp}>
      {props.text}
    </Button>
  );
};
