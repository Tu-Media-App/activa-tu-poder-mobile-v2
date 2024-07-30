import firestore from '@react-native-firebase/firestore';

export const useBlock = () => {
  const block = async (uid: string, targetUid: string) => {
    try {
      await firestore()
        .doc(`users/${uid}`)
        .set(
          {
            blocked: firestore.FieldValue.arrayUnion(targetUid),
          },
          { merge: true },
        );
      return true;
    } catch (error) {
      return false;
    }
  };

  return { block };
};
