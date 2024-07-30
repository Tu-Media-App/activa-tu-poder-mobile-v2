import { UserFactory } from '@/utils';
import firestore from '@react-native-firebase/firestore';

export const useCreateUser = () => {
  const createUser = async (email: string, uid: string, name?: string | null, lastName?: string | null) => {
    try {
      const userExists = await firestore().collection('users').doc(uid).get();
      if (userExists.exists) return;

      const defaultName = `user${uid.slice(0, 5)}`;
      const ref = firestore().doc(`users/${uid}`);
      const user = UserFactory(email, name, defaultName, lastName, uid);
      await ref.set(user, { merge: true });
    } catch (error) {
      console.error(error);
    }
  };

  return { createUser };
};
