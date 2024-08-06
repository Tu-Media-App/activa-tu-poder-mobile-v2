import auth from '@react-native-firebase/auth';

export const useRecoverPassword = () => {
  const sendRecoverMail = async (mail: string) => {
    try {
      await auth().sendPasswordResetEmail(mail);
      return { error: null };
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  return { sendRecoverMail };
};
