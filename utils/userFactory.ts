import User from '@/entities/users/user';
import { UserRoleEnum } from '@/entities/users/userRole';
import firestore from '@react-native-firebase/firestore';

export const UserFactory = (email: string, name: string | null | undefined, defaultName: string, 
    lastName: string | null | undefined, uid: string) => {
    return {
        email,
        name: name || defaultName,
        lastName: lastName || '',
        createdAt: firestore.Timestamp.now(),
        updatedAt: firestore.Timestamp.now(),
        role: UserRoleEnum.Customer,
        userName: '',
        uid,
        blocked: [],
        profileFilled: false,
    } as User;
}
