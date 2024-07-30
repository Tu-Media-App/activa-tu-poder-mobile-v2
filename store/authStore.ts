import User from '@/entities/users/user';
import firestore from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { create } from 'zustand';

interface AuthStore {
  firebaseUser: FirebaseAuthTypes.User | null;
  user: User | null;
  setFirebaseUser: (user: FirebaseAuthTypes.User | null) => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  firebaseUser: null,
  user: null,
  setFirebaseUser: (firebaseUser: FirebaseAuthTypes.User | null) => {
    console.log('firebaseUser', firebaseUser);
    if (firebaseUser) {
      firestore()
        .doc(`users/${firebaseUser.uid}`)
        .onSnapshot(snap => {
          console.log('snap.data()', snap.data());
          if (snap.data()) {
            set({ user: snap.data() as User, firebaseUser: firebaseUser });
            return;
          }
        });
    }
    console.log('setting null');
    set({ user: null, firebaseUser: null });
  },
}));
