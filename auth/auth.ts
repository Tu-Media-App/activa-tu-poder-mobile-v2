// /* eslint-disable @typescript-eslint/no-explicit-any */
// import firestore from '@react-native-firebase/firestore';
// import 'react-native-get-random-values';

// import { removeUndefined } from '@/lib/utils';
// import { PersonalInfo } from '@/entities/users/personalInfo';

// export const updateProfile = async (uid: string, personalInfo: PersonalInfo) => {
//   try {
//     removeUndefined(personalInfo);
//     await firestore().doc(`users/${uid}`).set(personalInfo, { merge: true });
//     return { personalInfo, error: null };
//   } catch (error) {
//     return { personalInfo: null, error };
//   }
// };
