export interface SelectedAnswer {
  id: string;
  text: string;
}

export interface AnalyticsItem {
  questionId: string;
  questionText: string;
  selectedAnswer: SelectedAnswer | null;
  isCorrect: boolean;
  correctAnswer: SelectedAnswer;
}

export interface Submission {
  id: string;
  examId: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  submittedAt: string;
}

export interface SubmissionResult {
  submission: Submission;
  analytics: AnalyticsItem[];
}