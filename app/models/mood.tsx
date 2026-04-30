export interface MoodSurveyData {
  q1: number; // stress
  q2: number; // sleep quality
  q3: number; // focus
  q4: number; // overwhelmed
  q5: number; // sleep issues
  q6: number; // distraction
}

export interface MoodEntry {
  mood: number;       // 1-5
  avgScore: number;
  adjustedScore: number;
  detectedMood: string;
  createdAtLocal: Date;
}
