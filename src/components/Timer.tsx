import React from 'react';
import { formatTime } from '../utils/utility';

/**
 * Props for the Timer component
 * @interface TimerProps
 * @property {number} timeLeft - Time remaining in seconds
 * @property {number} totalTime - Total time allowed in seconds
 */
interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

/**
 * Timer component displays remaining time with visual feedback
 * @component
 */
export const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime }) => {
  const percentage = (timeLeft / totalTime) * 100;
  const isWarning = timeLeft <= 10;

  return (
    <div className="bg-white rounded-lg shadow-sm p-2 flex items-center justify-center">
      <div className="relative">
        {/* Circular Progress */}
        <svg className="w-14 h-14 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="28"
            cy="28"
            r="25"
            strokeWidth="3"
            stroke="#f3f4f6"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="28"
            cy="28"
            r="25"
            strokeWidth="3"
            stroke={isWarning ? '#ef4444' : '#3b82f6'}
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: '157',
              strokeDashoffset: 157 * (1 - percentage / 100),
              transition: 'stroke-dashoffset 0.5s ease',
            }}
          />
        </svg>

        {/* Time Display */}
        <div
          className={`
            absolute inset-0 flex flex-col items-center justify-center
            ${isWarning ? 'text-red-500 animate-pulse' : 'text-blue-600'}
          `}
        >
          <svg
            className={`w-4 h-4 ${timeLeft <= 30 ? 'animate-pulse' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-mono text-sm font-bold">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
    </div>
  );
};
