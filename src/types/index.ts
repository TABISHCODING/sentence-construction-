/**
 * Question interface - represents a single question in the test
 */
export interface Question {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
}

/**
 * UserAnswer interface - represents a user's answer to a specific question
 */
export interface UserAnswer {
  questionId: string;
  selectedOptions: string[];
  isCorrect: boolean;
}

/**
 * TestResult interface - represents the overall test results
 */
export interface TestResult {
  score: number;
  answeredQuestions: UserAnswer[];
  completionTime: number;
}

/**
 * Activity interface - represents an activity
 */
export interface Activity {
  id: string;
  userId: string;
  type: string;
  coinType: string;
  coins: number;
  description: string;
  createdAt: string;
}

/**
 * APIResponse interface - represents the response from the server
 */
export interface ApiResponse {
  status: string;
  data: {
    testId: string;
    questions: Question[];
  };
  message: string;
  activity: Activity;
}
