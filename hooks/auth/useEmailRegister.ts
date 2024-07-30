import auth from '@react-native-firebase/auth';

export const useEmailRegister = () => {
  const emailRegister = async (email: string, password: string) => {
    try {
      const credential = await auth().createUserWithEmailAndPassword(email, password);
      await auth().currentUser?.sendEmailVerification();
      return { credential, error: null };
    } catch (error) {
      console.error(error);
      return { credential: null, error };
    }
  };

  return { emailRegister };
};
