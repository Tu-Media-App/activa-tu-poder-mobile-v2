import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export function isAuthError(error: any): error is FirebaseAuthTypes.NativeFirebaseAuthError {
  return typeof error?.code === 'string';
}
