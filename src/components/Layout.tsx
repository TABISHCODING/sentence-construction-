import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Props for the Layout component
 * @interface LayoutProps
 * @property {React.ReactNode} children - Child components to render within the layout
 * @property {string} [title] - Optional title to display in the header
 * @property {boolean} [showQuit] - Whether to show the quit button (default: true)
 */
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showQuit?: boolean;
  onQuit?: () => void;
}

/**
 * Layout component that provides consistent page structure and quit functionality
 * @component
 */
export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'MD TABISH',
  showQuit = true,
  onQuit
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTestScreen = location.pathname === '/test';

  const handleQuit = () => {
    if (onQuit) {
      onQuit();
    } else if (isTestScreen) {
      if (window.confirm('Are you sure you want to quit? Your progress will be lost.')) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {title}
              </h1>
              {showQuit && (
                <button
                  onClick={handleQuit}
                  className="inline-flex items-center px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md text-white bg-red-600 hover:bg-red-700"
                >
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Quit
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
