/**
 * @fileoverview Utility functions for the Sentence Construction app
 * Contains utilities for time formatting, question parsing, and score calculation
 */

import { Question, UserAnswer } from '../types/index';

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

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Formats a date string into a readable format
 * @param dateString The ISO date string to format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

/**
 * Limits a string to a maximum length and adds ellipsis if needed
 * @param str The string to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 */
export function truncateString(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * Debounce function to limit how often a function can be called
 * @param func The function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
