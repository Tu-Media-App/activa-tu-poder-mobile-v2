/* eslint-disable @typescript-eslint/no-explicit-any */
import { appleAuth, appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { v4 as uuid } from 'uuid';
import firestore from '@react-native-firebase/firestore';

import { Platform } from 'react-native';
import { config } from '@/config/config';
import { UserFactory } from '@/utils/userFactory';

export const useAppleRegister = () => {
    const registerWithApple = async () => {
        if (Platform.OS === 'ios') {
          try {
            const response = await appleAuth.performRequest({
              requestedOperation: appleAuth.Operation.LOGIN,
              requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });
    
            if (!response.identityToken) throw new Error('Apple Sign-In failed - no identify token returned');
    
            const { identityToken, nonce, fullName, email } = response;
    
            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    
            if (fullName && email) {
              const credential = await auth().signInWithCredential(appleCredential);
    
              const ref = firestore().doc(`users/${credential.user.uid}`);
    
              const defaultName = `user${credential.user.uid}`;
              const user = UserFactory(email, fullName.givenName, 
                defaultName, fullName.familyName, credential.user.uid);
    
              await ref.set(user);
              return { credential, error: null };
            } else {
              const credential = await auth().signInWithCredential(appleCredential);
              return { credential, error: null };
            }
          } catch (error: any) {
            console.error(error);
            return { credential: null, error };
          }
        } else if (Platform.OS === 'android') {
          try {
            const nonce = uuid();
            const state = uuid();
    
            appleAuthAndroid.configure({
              clientId: config.firebaseClientId,
              redirectUri: config.redirectUri,
              responseType: appleAuthAndroid.ResponseType.ALL,
              scope: appleAuthAndroid.Scope.ALL,
              nonce,
              state,
            });
    
            const response = await appleAuthAndroid.signIn();
            if (!response.id_token) throw Error('Invalid token');
    
            const name = response.user?.name?.firstName;
            const lastName = response.user?.name?.lastName;
            const email = response.user?.email;
    
            if (email) {
              const appleCredential = auth.AppleAuthProvider.credential(response.id_token, response.nonce);
              const credential = await auth().signInWithCredential(appleCredential);
    
              const ref = firestore().doc(`users/${credential.user.uid}`);
              const defaultName = `user${credential.user.uid}`;
    
              const user = UserFactory(email, name, defaultName, lastName, credential.user.uid);
    
              await ref.set(user);
              return { credential, error: null };
            } else {
              const appleCredential = auth.AppleAuthProvider.credential(response.id_token, response.nonce);
              const credential = await auth().signInWithCredential(appleCredential);
              return { credential, error: null };
            }
          } catch (error: any) {
            console.error(error);
            return { credential: null, error };
          }
        } else {
          return { credential: null, error: 'Platform not supported' };
        }
    }

    return { registerWithApple };
};
  