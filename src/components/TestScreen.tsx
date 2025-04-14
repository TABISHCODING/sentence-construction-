import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Question, UserAnswer } from '../types';
import { Layout } from './Layout';
import { ProgressBar } from './ProgressBar';
import { Timer } from './Timer';
import { parseQuestionText } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { ApiService } from '../services/api';

/**
 * Custom hook for managing the countdown timer
 * @param initialTime Initial time in seconds
 * @param onTimeUp Callback function to execute when time runs out
 * @returns Current time and timer control functions
 */
const useTimer = (initialTime: number, onTimeUp: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number>();

  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft, isPaused, onTimeUp]);

  const pauseTimer = useCallback(() => setIsPaused(true), []);
  const resumeTimer = useCallback(() => setIsPaused(false), []);
  const resetTimer = useCallback((newTime: number = initialTime) => {
    setTimeLeft(newTime);
    setIsPaused(false);
  }, [initialTime]);

  return { timeLeft, isPaused, pauseTimer, resumeTimer, resetTimer };
};

interface TestScreenProps {
  questions: Question[];
  onComplete: (answers: UserAnswer[]) => void;
  onQuit: () => void;
}

export const TestScreen: React.FC<TestScreenProps> = ({ questions, onComplete, onQuit }) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [placedOptions, setPlacedOptions] = useState<string[]>([]);
  const [availableOptions, setAvailableOptions] = useState<string[]>([]);
  const [showQuitModal, setShowQuitModal] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Handle navigation
  const handleNextQuestion = useCallback(() => {
    const isAnswerComplete = !placedOptions.includes('');
    if (!isAnswerComplete) return;

    const answer: UserAnswer = {
      questionId: currentQuestion.questionId,
      selectedOptions: [...placedOptions],  // Create a new array to avoid reference issues
      isCorrect: placedOptions.every((option, index) => option === currentQuestion.correctAnswer[index])
    };

    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex === questions.length - 1) {
      onComplete(newAnswers);
      navigate('/result');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestion, placedOptions, currentQuestionIndex, userAnswers, navigate, onComplete]);

  // Timer logic using custom hook
  const { timeLeft, resetTimer } = useTimer(ApiService.getDefaultQuestionTimeout(), handleNextQuestion);

  // Initialize options for current question
  useEffect(() => {
    if (currentQuestion) {
      setPlacedOptions(new Array(parseQuestionText(currentQuestion.question).length - 1).fill(''));
      setAvailableOptions([...currentQuestion.options]);
      resetTimer();
    }
  }, [currentQuestion, resetTimer]);

  // Handle word selection
  const handleOptionSelect = (option: string) => {
    const emptyIndex = placedOptions.findIndex(opt => opt === '');
    if (emptyIndex !== -1) {
      const newPlacedOptions = [...placedOptions];
      newPlacedOptions[emptyIndex] = option;
      setPlacedOptions(newPlacedOptions);
      setAvailableOptions(availableOptions.filter(opt => opt !== option));
    }
  };

  // Handle word removal
  const handleRemoveOption = (index: number) => {
    const option = placedOptions[index];
    if (option) {
      const newPlacedOptions = [...placedOptions];
      newPlacedOptions[index] = '';
      setPlacedOptions(newPlacedOptions);
      setAvailableOptions([...availableOptions, option]);
    }
  };

  // Handle previous question
  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleQuit = () => {
    setShowQuitModal(true);
  };

  const handleConfirmQuit = () => {
    onQuit();
    navigate('/');
  };

  const handleCancelQuit = () => {
    setShowQuitModal(false);
  };

  if (!currentQuestion) {
    return (
      <Layout onQuit={handleQuit} title="Loading...">
        <div className="text-center py-10">Loading questions...</div>
      </Layout>
    );
  }

  return (
    <Layout onQuit={handleQuit} title="Test in Progress">
      <AnimatePresence>
        {showQuitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleCancelQuit}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Are you sure you want to quit?
              </h3>
              <p className="text-gray-600 mb-6">
                Your progress will be lost and you'll need to start over.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={handleCancelQuit}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmQuit}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Quit Test
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Timer and Progress */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className="flex-1">
            <ProgressBar
              current={currentQuestionIndex + 1}
              total={questions.length}
              label="Question Progress"
              showPercentage={true}
            />
          </div>
          <div className="flex-shrink-0">
            <Timer timeLeft={timeLeft} totalTime={30} />
          </div>
        </div>

        {/* Question Area */}
        <motion.div
          className="p-6 bg-white rounded-lg shadow-sm border border-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="text-lg leading-relaxed p-6 bg-white rounded-lg shadow-sm relative">
            <div className="text-sm text-gray-500 mb-4 text-center">
              Select the missing words in the correct order
            </div>

            {parseQuestionText(currentQuestion.question).map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index < parseQuestionText(currentQuestion.question).length - 1 && (
                  <span
                    className={`inline-block min-w-[100px] mx-2 cursor-pointer transition-all duration-200 ${
                      placedOptions[index] ? 'transform hover:scale-105' : ''
                    }`}
                    onClick={() => placedOptions[index] && handleRemoveOption(index)}
                    title={placedOptions[index] ? 'Click to remove' : 'Select a word below'}
                  >
                    {placedOptions[index] ? (
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded border border-blue-100 hover:bg-blue-100 transition-colors">
                        {placedOptions[index]}
                      </span>
                    ) : (
                      <span className="inline-block w-full h-[2px] bg-gray-300 animate-pulse"></span>
                    )}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Word Options */}
          <motion.div
            className="p-6 bg-gray-50 rounded-lg mb-6 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="text-sm text-gray-500 mb-3">Available Words:</div>
            <div className="flex flex-wrap gap-3">
              {availableOptions.map((option, index) => (
                <motion.button
                  key={index}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-lg
                    ${placedOptions.includes('')
                      ? 'bg-white border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transform hover:scale-105 transition-all duration-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                  `}
                  onClick={() => handleOptionSelect(option)}
                  disabled={!placedOptions.includes('')}
                  title={placedOptions.includes('') ? 'Click to place this word' : 'Complete the current blank first'}
                  whileHover={placedOptions.includes('') ? { scale: 1.05 } : {}}
                  whileTap={placedOptions.includes('') ? { scale: 0.95 } : {}}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100">
            <button
              className={`
                px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200
                ${currentQuestionIndex > 0
                  ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  : 'text-gray-300 cursor-not-allowed'}
              `}
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Previous</span>
            </button>


            <button
              className={`
                px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200
                ${!placedOptions.includes('')
                  ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
              `}
              onClick={handleNextQuestion}
              disabled={placedOptions.includes('')}
            >
              <span>{currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};
