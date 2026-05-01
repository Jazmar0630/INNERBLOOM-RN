import { auth, db } from './firebase';
import {
  collection, addDoc, query, where,
  orderBy, getDocs, Timestamp, serverTimestamp,
} from 'firebase/firestore';

export interface MoodSurveyData {
  q1: number; q2: number; q3: number;
  q4: number; q5: number; q6: number;
}

export function computeMoodScore(d: MoodSurveyData): number {
  const s = (v: number, rev: boolean) => rev ? 6 - v : v;
  return (s(d.q1,true)+s(d.q2,false)+s(d.q3,false)+s(d.q4,true)+s(d.q5,true)+s(d.q6,true)) / 6;
}

export function detectedMoodLabel(avg: number) {
  if (avg <= 2) return 'overwhelmed';
  if (avg <= 3) return 'stressed';
  if (avg <= 4) return 'tired';
  return 'calm';
}

export async function saveMood(data: MoodSurveyData) {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  const avg = computeMoodScore(data);
  const moodValue = Math.min(5, Math.max(1, Math.round(avg)));
  await addDoc(collection(db, 'users', uid, 'moods'), {
    mood: moodValue,
    avgScore: (data.q1+data.q2+data.q3+data.q4+data.q5+data.q6) / 6,
    adjustedScore: avg,
    detectedMood: detectedMoodLabel(avg),
    createdAt: serverTimestamp(),
    createdAtLocal: Timestamp.fromDate(new Date()),
  });
}

export async function getMoods(period: 'Weekly' | 'Monthly' | 'Yearly') {
  const uid = auth.currentUser?.uid;
  if (!uid) return [];
  const now = new Date();
  const start =
    period === 'Weekly' ? new Date(now.getTime() - 7 * 86400000) :
    period === 'Monthly' ? new Date(now.getFullYear(), now.getMonth(), 1) :
    new Date(now.getFullYear(), 0, 1);
  const q = query(
    collection(db, 'users', uid, 'moods'),
    where('createdAtLocal', '>=', Timestamp.fromDate(start)),
    orderBy('createdAtLocal')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}
