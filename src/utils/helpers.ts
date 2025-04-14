/**
 * @fileoverview Helper functions for the Sentence Construction app
 * Contains utilities for time formatting, question parsing, and score calculation
 */

import { Question, UserAnswer } from '../types';

/**
 * Formats time in seconds to MM:SS format
 * @param seconds The time in seconds
 * @returns Formatted time string (MM:SS)
 */
export const formatTime = (seconds: number): string => {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
};

/**
 * Parses a question string to extract text segments and blank positions
 * @param questionText The question text with blank placeholders
 * @returns An array of segments alternating between text and blanks
 */
export const parseQuestionText = (questionText: string): string[] => {
  return questionText.split('_____________');
};

/**
 * Calculates the score based on total questions and correct answers
 * @param totalQuestions The total number of questions
 * @param correctAnswers The number of correct answers
 * @returns The calculated score
 */
export const calculateScore = (totalQuestions: number, correctAnswers: number): number => {
  return Math.round((correctAnswers / totalQuestions) * 100);
};

/**
 * Checks if the user's answer is correct
 * @param question The current question
 * @param selectedOptions The user's selected options
 * @returns Whether the answer is correct
 */
export const checkAnswer = (question: Question, selectedOptions: string[]): boolean => {
  if (!question.correctAnswer || !selectedOptions) return false;
  if (question.correctAnswer.length !== selectedOptions.length) return false;

  return question.correctAnswer.every((answer, index) =>
    answer.toLowerCase() === selectedOptions[index]?.toLowerCase()
  );
};

/**
 * Gets the next question index
 * @param currentIndex Current question index
 * @param totalQuestions Total number of questions
 * @returns Next question index or null if at the end
 */
export const getNextQuestionIndex = (currentIndex: number, totalQuestions: number): number | null => {
  return currentIndex < totalQuestions - 1 ? currentIndex + 1 : null;
};

/**
 * Gets the previous question index
 * @param currentIndex Current question index
 * @returns Previous question index or null if at the start
 */
export const getPreviousQuestionIndex = (currentIndex: number): number | null => {
  return currentIndex > 0 ? currentIndex - 1 : null;
};

/**
 * Calculates the progress percentage
 * @param currentIndex Current question index
 * @param totalQuestions Total number of questions
 * @returns Progress percentage (0-100)
 */
export const calculateProgress = (currentIndex: number, totalQuestions: number): number => {
  return Math.round(((currentIndex + 1) / totalQuestions) * 100);
};

/**
 * Creates a new user answer object
 * @param questionId Question ID
 * @param selectedOptions Selected options
 * @param isCorrect Whether the answer is correct
 * @returns UserAnswer object
 */
export const createUserAnswer = (questionId: string, selectedOptions: string[], isCorrect: boolean): UserAnswer => {
  return { questionId, selectedOptions, isCorrect };
};
