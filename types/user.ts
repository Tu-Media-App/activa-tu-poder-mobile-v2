import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { PersonalInfo } from './personalInfo';
import { Role } from './userRole';

export interface User extends PersonalInfo {
  userName: string | null;
  email: string;
  profileFilled: false;
  role: Role;
  uid: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
}
