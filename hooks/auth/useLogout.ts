import auth from '@react-native-firebase/auth';

export const useLogout = () => {

    const logout = async () => {
        await auth().signOut();
    }
  
    return { logout };
  };