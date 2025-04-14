import React from 'react';
import { motion } from 'framer-motion';
import { Question, UserAnswer } from '../types';

interface FeedbackScreenProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  score: number;
  onRetry: () => void;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  questions,
  userAnswers,
  score,
  onRetry,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Score Section */}
        <div className="p-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <h1 className="text-3xl font-bold mb-4">Test Complete!</h1>
          <div className="text-xl">
            Your Score: <span className="font-bold">{score} out of {questions.length}</span>
          </div>
          <div className="text-blue-100 mt-2">
            {score === questions.length
              ? 'Perfect score! Excellent work! 🎉'
              : score >= Math.floor(questions.length * 0.7)
              ? 'Great job! Keep it up! 👏'
              : score >= Math.floor(questions.length * 0.4)
              ? 'Good effort! Practice makes perfect! 💪'
              : 'Keep practicing! You can do better! 📚'}
          </div>
        </div>

        {/* Answers Review */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Review Your Answers</h2>
          <div className="space-y-8">
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer?.isCorrect;

              return (
                <motion.div
                  key={question.questionId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-lg ${
                    isCorrect ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Question {index + 1}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        isCorrect
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <div className="mb-4 text-gray-700">{question.question}</div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">Your answer:</div>
                    <div className="flex flex-wrap gap-2">
                      {userAnswer?.selectedOptions.map((option, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 rounded ${
                            option === question.correctAnswer[i]
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {option}
                        </span>
                      ))}
                    </div>

                    {!isCorrect && (
                      <>
                        <div className="text-sm text-gray-500 mt-4">
                          Correct answer:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {question.correctAnswer.map((option, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded bg-green-100 text-green-800"
                            >
                              {option}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onRetry}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    </div>
  );
};
