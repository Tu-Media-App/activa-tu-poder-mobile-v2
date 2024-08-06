import { AuthMessage } from '@/auth/authMessage';
import { AlertParams } from '@/constants';
import { useErrorStore } from '@/store';
import { isAuthError } from '@/utils';
import { Alert } from 'react-native';

export const useAuthErrorHandler = () => {
  const setError = useErrorStore(state => state.setError);

  const handleAuthError = (error: unknown, successAlert: AlertParams) => {
    if (isAuthError(error)) {
      const { code } = error;
      const message = AuthMessage[code];
      setError(message);
    } else {
      Alert.alert(...successAlert);
    }
  };

  return { handleAuthError };
};
