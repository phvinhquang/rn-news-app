// Import the functions you need from the SDKs you need
import {initializeApp, getApp, getApps} from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from 'firebase/auth';

let firebaseApp: any;
export const getFirebaseApp = function () {
  if (firebaseApp) {
    return firebaseApp;
  }

  // Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyDIghfSJv-5kbfX075UE57h7VogXdozBHA',
    authDomain: 'react-auth-d40cd.firebaseapp.com',
    databaseURL:
      'https://react-auth-d40cd-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'react-auth-d40cd',
    storageBucket: 'react-auth-d40cd.appspot.com',
    messagingSenderId: '38764887797',
    appId: '1:38764887797:web:9d09161ee782019792cfbc',
  };

  // Initialize Firebase
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  // Initialize Firebase Auth (Tutorial use this)
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });

  firebaseApp = app;
  return app;
};
