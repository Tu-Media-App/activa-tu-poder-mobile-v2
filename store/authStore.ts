import firestore from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { create } from 'zustand';
import { User } from '@/types';

interface AuthStore {
  firebaseUser: FirebaseAuthTypes.User | null;
  user: User | null;
  setFirebaseUser: (user: FirebaseAuthTypes.User | null) => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  firebaseUser: null,
  user: null,
  setFirebaseUser: (firebaseUser: FirebaseAuthTypes.User | null) => {
    if (firebaseUser) {
      firestore()
        .doc(`users/${firebaseUser.uid}`)
        .onSnapshot(snap => {
          if (snap.data()) {
            set({ user: snap.data() as User, firebaseUser: firebaseUser });
            return;
          }
        });
    }
    set({ user: null, firebaseUser: null });
  },
}));
