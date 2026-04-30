import { db, auth } from './firebase';
import { collection, addDoc, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import type { MoodSurveyData } from '../models/mood';

export function computeMoodScore(data: MoodSurveyData): number {
  const score = (v: number, reverse: boolean) => reverse ? 6 - v : v;
  const total = score(data.q1, true) + score(data.q2, false) + score(data.q3, false)
              + score(data.q4, true) + score(data.q5, true) + score(data.q6, true);
  return total / 6;
}

export function detectedMoodLabel(avg: number): string {
  if (avg <= 2) return 'overwhelmed';
  if (avg <= 3) return 'stressed';
  if (avg <= 4) return 'tired';
  return 'calm';
}

export async function saveMood(data: MoodSurveyData) {
  const uid = auth.currentUser?.uid;
  if (!uid) return;
  const avg = computeMoodScore(data);
  await addDoc(collection(db, 'users', uid, 'moods'), {
    mood: Math.round(avg).clamp?.(1, 5) ?? Math.min(5, Math.max(1, Math.round(avg))),
    avgScore: (data.q1+data.q2+data.q3+data.q4+data.q5+data.q6) / 6,
    adjustedScore: avg,
    detectedMood: detectedMoodLabel(avg),
    createdAt: serverTimestamp(),
    createdAtLocal: Timestamp.fromDate(new Date()),
  });
}

export async function getMoods(period: 'Weekly'|'Monthly'|'Yearly') {
  const uid = auth.currentUser?.uid;
  if (!uid) return [];
  const now = new Date();
  const start = period === 'Weekly' ? new Date(now.getTime() - 7*86400000)
              : period === 'Monthly' ? new Date(now.getFullYear(), now.getMonth(), 1)
              : new Date(now.getFullYear(), 0, 1);
  const q = query(
    collection(db, 'users', uid, 'moods'),
    where('createdAtLocal', '>=', Timestamp.fromDate(start)),
    orderBy('createdAtLocal')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}
