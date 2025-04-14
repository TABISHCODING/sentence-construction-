/**
 * @component QuestionCard
 * @description Displays a single question with drag-and-drop functionality for word options
 * Handles user interactions and validates answers
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Question } from '../types';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedOptions: string[]) => void;
  timeLeft: number;
  onTimeout: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  timeLeft,
  onTimeout,
}) => {
  const [placedOptions, setPlacedOptions] = useState<(string | null)[]>([]);
  const [availableOptions, setAvailableOptions] = useState<string[]>([]);

  const blanksCount = useMemo(() => {
    return (question.question.match(/_{2,}/g) || []).length;
  }, [question.question]);

  useEffect(() => {
    setPlacedOptions(new Array(blanksCount).fill(null));
    setAvailableOptions(question.options);
  }, [question.questionId, blanksCount, question.options]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
    }
  }, [timeLeft, onTimeout]);

  const handleWordSelect = (option: string) => {
    const newPlacedOptions = [...placedOptions];
    const emptyIndex = newPlacedOptions.indexOf(null);
    if (emptyIndex !== -1) {
      newPlacedOptions[emptyIndex] = option;
      setPlacedOptions(newPlacedOptions);

      if (!newPlacedOptions.includes(null)) {
        onAnswer(newPlacedOptions.filter((opt): opt is string => opt !== null));
      }
    }
  };

  const handleBlankClick = (index: number) => {
    if (placedOptions[index] !== null) {
      const newPlacedOptions = [...placedOptions];
      newPlacedOptions[index] = null;
      setPlacedOptions(newPlacedOptions);
    }
  };

  const renderQuestion = () => {
    const parts = question.question.split(/(_{2,})/g);
    let blankIndex = 0;

    return parts.map((part: string, index: number) => {
      if (part.startsWith('_')) {
        const word = placedOptions[blankIndex];
        const currentIndex = blankIndex++;
        return (
          <motion.button
            key={index}
            onClick={() => handleBlankClick(currentIndex)}
            className={`mx-2 px-4 py-2 rounded ${word ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {word || '_____'}
          </motion.button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Question {question.questionId}
        </h2>
        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Time: {timeLeft}s
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 transition-all duration-300 hover:shadow-xl">
        <div className="mb-6 text-base sm:text-lg text-gray-800 dark:text-gray-200">
          {renderQuestion()}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Available Words:</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {availableOptions.map((option: string) => (
              <motion.button
                key={option}
                onClick={() => handleWordSelect(option)}
                disabled={placedOptions.includes(option)}
                className={`
                  p-3 text-center rounded-lg transition-colors
                  ${placedOptions.includes(option)
                    ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
