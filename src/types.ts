export interface Question {
  questionId: string;
  question: string;
  options: string[];
  correctAnswer: string[];
}

export interface UserAnswer {
  questionId: string;
  selectedOptions: string[];
  isCorrect: boolean;
}

export interface TestResult {
  testId: string;
  userId?: string;
  answers: UserAnswer[];
  score: number;
  completedAt: string;
}

export interface ApiResponse {
  success: boolean;
  data: {
    testId: string;
    questions: Question[];
  };
  error?: string;
}
