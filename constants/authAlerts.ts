import { AlertButton, AlertOptions } from 'react-native';
type AlertParams = [string, string, AlertButton[], AlertOptions];

export const authAlerts: { success: AlertParams; googleFail: AlertParams; appleFail: AlertParams } = {
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
