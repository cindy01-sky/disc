export type DISCType = 'D' | 'I' | 'S' | 'C';

export interface Question {
  title: string;
  options: Record<DISCType, string>;
}

export interface AnalysisResult {
  animal: string;
  desc: string;
}

export interface Scores {
  D: number;
  I: number;
  S: number;
  C: number;
}
