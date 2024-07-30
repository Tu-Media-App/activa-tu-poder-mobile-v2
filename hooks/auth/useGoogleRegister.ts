import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import { config } from '@/config/config';

export const useGoogleRegister = () => {
  GoogleSignin.configure({
    webClientId: config.googleWebClientId,
  });
  const registerWithGoogle = async () => {
    try {
      const hasServices = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      if (!hasServices) throw new Error('Servicios de Google Play no disponibles');

      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const credential = await auth().signInWithCredential(googleCredential);

      return { credential, error: null };
    } catch (error: any) {
      console.error(error);
      return { credential: null, error };
    }
  };
  return { registerWithGoogle };
};
