import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const defaultActiveDays = () => ({
  mon: true, tue: false, wed: false, thu: false,
  fri: false, sat: false, sun: false,
});

export async function signup(username: string, email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: username });
  await setDoc(doc(db, 'users', cred.user.uid), {
    uid: cred.user.uid, username, name: username, email,
    role: 'user', photoUrl: null, isNewUser: true,
    activeDays: defaultActiveDays(), lastActiveAt: null,
    createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
}

export async function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
