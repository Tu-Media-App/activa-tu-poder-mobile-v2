import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const useStorePhoto = () => {
  const storePhoto = async (uid: string, photo: string) => {
    const bucketPath = `/images/${uid}/profile/`;
    const reference = storage().ref(bucketPath);
    // storage bucket reference
    await reference.putFile(photo as string);
    // get download url file
    const photoUrl = await reference.getDownloadURL();
    await firestore().doc(`users/${uid}`).set({ photoUrl }, { merge: true });
  };

  return { storePhoto };
};
