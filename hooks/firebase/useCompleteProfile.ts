import { ProfileSheetFields } from '@/types';
import firestore from '@react-native-firebase/firestore';

export const useCompleteProfile = () => {
  const completeProfile = async (fields: ProfileSheetFields, uid: string) => {
    const ref = firestore().doc(`users/${uid}`);
    const { gender, country, province, city, birthdate } = fields;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = {
        updatedAt: firestore.Timestamp.now(),
        birthdate,
        gender,
        country,
      };

      if (province) user.province = province;
      if (city) user.city = city;

      await ref.set(user, { merge: true });
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return { completeProfile };
};
