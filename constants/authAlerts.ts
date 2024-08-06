import { AlertButton, AlertOptions } from 'react-native';
export type AlertParams = [string, string, AlertButton[], AlertOptions];

type AuthAlerts = {
  success: AlertParams;
  emailSignUpSuccess: AlertParams;
  recoverPasswordSuccess: AlertParams;
  googleFail: AlertParams;
  appleFail: AlertParams;
};

export const authAlerts: AuthAlerts = {
  success: [
    '¡Bienvenido!',
    'Te has registrado correctamente. Ahora puedes usar el chat, dejar comentarios y mucho más.',
    [
      {
        text: 'De acuerdo',
        onPress: () => {},
      },
    ],
    { cancelable: true },
  ],
  emailSignUpSuccess: [
    'Confirmar correo',
    'Se ha enviado un correo de confirmación a tu dirección de correo electrónico',
    [
      {
        text: 'De acuerdo',
        onPress: () => {},
      },
    ],
    { cancelable: true },
  ],
  recoverPasswordSuccess: [
    'Correo enviado',
    'Se ha enviado un correo con instrucciones para recuperar tu contraseña',
    [
      {
        text: 'De acuerdo',
        onPress: () => {},
      },
    ],
    { cancelable: true },
  ],
  googleFail: [
    'Aviso',
    'No se pudo iniciar sesión con con google',
    [
      {
        text: 'De acuerdo',
        onPress: () => {},
      },
    ],
    { cancelable: true },
  ],
  appleFail: [
    'Aviso',
    'No se pudo iniciar sesión con con apple',
    [
      {
        text: 'De acuerdo',
        onPress: () => {},
      },
    ],
    { cancelable: true },
  ],
};
