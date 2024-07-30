import { useErrorStore } from '@/store';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { useCreateUser } from '../firebase';

export const useLogin = () => {
  const setError = useErrorStore(state => state.setError);
  const [email, setEmail] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);
  const { createUser } = useCreateUser();

  const login = async () => {
    if (!email || !password) return;
    try {
      const credential = await auth().signInWithEmailAndPassword(email, password);
      if (credential && credential.user.emailVerified) {
        await createUser(email, credential.user.uid);
        return { credential, error: null };
      }
      setError('Correo no verificado');
    } catch (e: any) {
      const error = handleError(e as FirebaseAuthTypes.NativeFirebaseAuthError);
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

    return message;
  };

  return { login, setEmail, setPassword };
};
