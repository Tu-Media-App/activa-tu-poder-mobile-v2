import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface PersonalInfo {
    name?: string;
    lastName?: string;
    profession?: string;
    about?: string;
    gender?: string;
    country?: string;
    province?: string;
    city?: string;
    photoUrl?: string;
    blocked: string[];
    birthdate?: FirebaseFirestoreTypes.Timestamp;
    wish?: string;
  }