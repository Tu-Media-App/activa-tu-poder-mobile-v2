import { PersonalInfo } from '@/types';
import { removeUndefined } from '@/utils';
import firestore from '@react-native-firebase/firestore';

export const useUpdateProfile = () => {
  const updateProfile = async (uid: string, personalInfo: PersonalInfo) => {
    try {
      removeUndefined(personalInfo);
      await firestore().doc(`users/${uid}`).set(personalInfo, { merge: true });
      return { personalInfo, error: null };
    } catch (error) {
      return { personalInfo: null, error };
    }
  };

  return { updateProfile };
};
