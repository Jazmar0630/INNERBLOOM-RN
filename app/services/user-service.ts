import { auth, db } from './firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

const weekdayKey = () =>
  ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()];

export async function checkIn() {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  const today = weekdayKey();
  await updateDoc(doc(db, 'users', uid), {
    [`activeDays.${today}`]: true,
    lastActiveAt: serverTimestamp(),
  });
}
