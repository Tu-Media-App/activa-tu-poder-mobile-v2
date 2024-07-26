import auth from '@react-native-firebase/auth';

import { useCreateUser } from '../firebase/useCreateUser';

export const useEmailRegister = () => {
    const {createUser} = useCreateUser();
    const emailRegister = async (email: string, password: string) => {
        try {
          const credential = await auth().createUserWithEmailAndPassword(email, password);
          if (credential) await createUser(email, credential.user.uid);
          return { credential, error: null };
        } catch (error) {
          console.error(error);
          return { credential: null, error };
        }
    }
  
    return { emailRegister };
  };