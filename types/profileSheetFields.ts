import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface ProfileSheetFields {
  gender: string;
  country: string;
  province?: string;
  city?: string;
  birthdate: FirebaseFirestoreTypes.Timestamp;
}