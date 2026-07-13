export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  examId: string;
  answers: Answer[];
}

export interface QuestionsResponse {
  questions: Question[];
}