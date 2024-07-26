import { useErrorStore } from '@/store';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';

export const useLogin = () => {
  const setError = useErrorStore(state => state.setError);
  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

  const login = async () => {
    if (!email || !password) return;
    try {
      const credential = await auth().signInWithEmailAndPassword(email, password);
      return { credential, error: null };
    } catch (e: any) {
      const { error } = handleError(e as FirebaseAuthTypes.NativeFirebaseAuthError);
      setError(error);
    }
  };

  const handleError = (error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
    let message;
    switch (error.code) {
      case 'auth/invalid-email':
        message = 'Correo no válido';
        break;
      case 'auth/user-disabled':
        message = 'Usuario deshabilitado';
        break;
      case 'auth/user-not-found':
        message = 'Usuario no registrado';
        break;
      case 'auth/wrong-password':
        message = 'Credenciales incorrectas';
        break;
      case 'auth/too-many-requests':
        message = 'Demasiados intentos, intente más tarde';
        break;
      default:
        message = 'Servicio no disponible';
    }

    return { credential: null, error: message };
  };

  return { login, setEmail, setPassword };
};
