
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const useDeleteUser = () => {

    const deleteUser = async (currentUser: FirebaseAuthTypes.User) => {
        try {
            await currentUser.delete();
            await firestore().doc(`users/${currentUser.uid}`).delete();

            return true;
        } catch (error) {
            return false;
        }
    }
  
    return { deleteUser };
  };