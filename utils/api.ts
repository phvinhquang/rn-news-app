import {getFirebaseApp} from './firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  updateProfile,
  updatePassword,
} from 'firebase/auth';
// import {child, getDatabase, set, ref} from 'firebase/database';

export const signUpAPI = async function (
  username: string,
  email: string,
  password: string,
): Promise<void> {
  const app = getFirebaseApp();
  const auth = getAuth(app);

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const {uid} = result.user;
    if (uid) {
      // Update username if there is uid
      updateProfile(result.user, {
        displayName: username,
      });
    }
  } catch (e: any) {
    if (e.code === 'auth/email-already-in-use') throw new Error(e.code);
  }
};

export const signInAPI = async function (
  username: string,
  email: string,
  password: string,
) {
  const app = getFirebaseApp();
  const auth = getAuth(app);

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const username = result.user.displayName;
    const token = (await result.user.getIdTokenResult()).token;
    const expiration = (await result.user.getIdTokenResult()).expirationTime;

    return {username, token, expiration};
  } catch (e: any) {
    if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found') {
      throw new Error(e.code);
    }
  }
};

export const signOutAPI = async function () {
  const app = getFirebaseApp();
  const auth = getAuth(app);

  try {
    await signOut(auth);
  } catch (e) {
    console.log(e);
  }
};

export const updatePasswordAPI = async function (
  oldPassword: string,
  newPassword: string,
) {
  const app = getFirebaseApp();
  const auth = getAuth(app);

  try {
    const user = auth.currentUser;
    if (user) {
      const credentials = EmailAuthProvider.credential(
        user?.email as string,
        oldPassword,
      );

      const isAuth = await reauthenticateWithCredential(user, credentials);
      if (isAuth) {
        await updatePassword(user, newPassword);
      }
    }
  } catch (err) {
    throw new Error((err as any).code);
  }
};
