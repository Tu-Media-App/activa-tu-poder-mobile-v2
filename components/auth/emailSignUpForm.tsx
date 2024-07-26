import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '@/components/global/Button';

import { SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '@/components/global/TextInput';
import { RegisterFields } from '@/auth/registerFields';
import { AuthMessage } from '@/auth/authMessage';
import { useEmailRegister } from '@/hooks/auth/useEmailRegister';
import { isAuthError } from '@/utils/isAuthError';
import { useErrorStore, useLoadingStore, useTermsAndConditionsStore } from '@/store';
import { TermsAndConditions } from './termsAndConditions';

export const EmailSignUpForm = () => {
  const areTermsAccepted = useTermsAndConditionsStore(state => state.isAccepted);
  const [showLoader, hideLoader] = useLoadingStore(state => [state.showLoader, state.hideLoader]);
  const { emailRegister } = useEmailRegister();
  const setError = useErrorStore(state => state.setError);
  const form = useForm<RegisterFields>({ mode: 'all' });
  const { password, passwordConfirm } = form.watch();

  const submit: SubmitHandler<RegisterFields> = async (fields: RegisterFields) => {
    showLoader();
    const { error } = await emailRegister(fields.email, fields.password);
    hideLoader();

    if (isAuthError(error)) {
      const { code } = error;
      const message = AuthMessage[code];
      setError(message);
    } else {
      // Alert.alert(...alerts.success);
    }
  };

  useEffect(() => {
    if (password === passwordConfirm) {
      form.clearErrors(['password', 'passwordConfirm']);
    } else {
      form.setError('password', { message: 'Las contraseñas no coinciden' });
      form.setError('passwordConfirm', { message: 'Las contraseñas no coinciden' });
    }
  }, [password, passwordConfirm]);

  return (
    <>
      <View style={styles.body}>
        <TextInput
          name="email"
          control={form.control}
          rules={{ required: 'Campo requerido' }}
          label={'Correo Electrónico'}
          autoComplete={'email'}
          autoCapitalize="none"
          placeholder="ejemplo123@email.com"
        />

        <TextInput
          name="password"
          control={form.control}
          rules={{ required: 'Campo requerido' }}
          label="Contraseña"
          autoComplete="password"
          secureTextEntry
          autoCapitalize="none"
          placeholder={'* * * * *'}
        />

        <TextInput
          name="passwordConfirm"
          control={form.control}
          rules={{ required: 'Campo requerido' }}
          label="Confirmar Contraseña"
          autoComplete="password"
          secureTextEntry
          autoCapitalize="none"
          placeholder="* * * * *"
        />
      </View>
      <TermsAndConditions />
      <Button disabled={!areTermsAccepted} onPress={form.handleSubmit(submit, (error: any) => console.warn(error))}>
        Registrarse
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  body: { width: '100%', alignItems: 'center', marginTop: 20 },
});
