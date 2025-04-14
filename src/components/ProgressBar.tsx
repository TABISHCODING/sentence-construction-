import React from 'react';

/**
 * Props for the ProgressBar component
 * @interface ProgressBarProps
 * @property {number} current - Current progress value
 * @property {number} total - Total value representing 100% progress
 * @property {string} [label] - Optional label to display with the progress
 * @property {boolean} [showPercentage] - Whether to show percentage value
 */
interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
}

/**
 * A reusable progress bar component with customizable appearance
 * @component
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label = 'Progress',
  showPercentage = true
}) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {showPercentage && (
          <span className="text-sm font-medium text-gray-600">
            Question {current} of {total}
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden transition-all duration-300 shadow-inner">
        <div
          className="
            bg-gradient-to-r from-blue-500 to-blue-600
            h-3 rounded-full transition-all duration-500 ease-out
            transform origin-left
          "
          style={{
            width: `${percentage}%`,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1) inset'
          }}
        >
          <div className="
            h-full w-full
            bg-gradient-to-r from-transparent via-white/30 to-transparent
            animate-shimmer
          "></div>
        </div>
      </div>
    </div>
  );
};
