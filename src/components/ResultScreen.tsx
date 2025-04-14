import React from 'react';
import { Link } from 'react-router-dom';
import { Question, UserAnswer } from '../types';
import { parseQuestionText } from '../utils/utility';

interface ResultScreenProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  score: number;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ questions, userAnswers, score }) => {
  const questionResults = questions.map((question, index) => {
    const userAnswer = userAnswers.find(answer => answer.questionId === question.questionId);
    return { question, userAnswer, index: index + 1 };
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            MD TABISH
          </h1>
        </div>
        {/* Score Section */}
        <div className="text-center px-4 mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <svg className="w-32 h-32">
                <circle
                  className="text-gray-100"
                  strokeWidth="6"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
                <circle
                  className="text-green-500"
                  strokeWidth="6"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                  style={{
                    strokeDasharray: '364.425',
                    strokeDashoffset: 364.425 * (1 - score / 100),
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-medium">{score}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 max-w-lg mx-auto mb-6">
            {score >= 80 ? (
              "Excellent work! You've demonstrated a strong understanding of sentence construction."
            ) : score >= 60 ? (
              "Good effort! With a bit more practice, you'll master these concepts."
            ) : (
              "Keep practicing! Focus on understanding the context and word relationships."
            )}
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              to="/"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Start New Test
            </Link>
          </div>
        </div>

        {/* Results List */}
        <div className="px-4 space-y-3">
          {questionResults.map(({ question, userAnswer, index }) => {
            const isCorrect = userAnswer?.isCorrect;
            const parts = parseQuestionText(question.question);

            return (
              <div
                key={question.questionId}
                className="bg-gray-50 rounded p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-gray-400">#{index}</span>
                  <span className={`text-xs font-medium ${
                    isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                {/* Correct Answer */}
                <div className="text-sm text-gray-600 mb-2">
                  {parts.map((part: string, idx: number) => (
                    <React.Fragment key={idx}>
                      {part}
                      {idx < parts.length - 1 && (
                        <span className="px-2 py-0.5 mx-1 bg-green-50 text-green-600 text-sm">
                          {question.correctAnswer[idx]}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* User's Answer (if incorrect) */}
                {!isCorrect && userAnswer && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="text-xs text-gray-400 mb-1">Your response:</div>
                    <div className="text-sm text-gray-600">
                      {parts.map((part: string, idx: number) => (
                        <React.Fragment key={idx}>
                          {part}
                          {idx < parts.length - 1 && (
                            <span className="px-2 py-0.5 mx-1 bg-red-50 text-red-600 text-sm">
                              {userAnswer.selectedOptions[idx]}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
