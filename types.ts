
export interface Question {
  id: number;
  text: string;
  keyword: string;
  options: {
    text: string;
    points: number;
  }[];
}

export enum AppScreen {
  LANDING = 'landing',
  QUIZ = 'quiz',
  RESULT = 'result',
}

export interface UserStats {
  score: number;
  totalQuestions: number;
  answers: number[];
  aiTitle?: string;
  aiDescription?: string;
}

export interface XUserInfo {
  handle: string;
  name: string;
}
