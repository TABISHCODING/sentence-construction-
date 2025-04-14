import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { TestScreen } from './components/TestScreen';
import { FeedbackScreen } from './components/FeedbackScreen';
import { Question, UserAnswer } from './types/index';
import { ApiService } from './services/api';

/**
 * Main App component that handles routing and state management
 * @returns The main App component
 */
function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load questions from API on component mount
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setError(null);
        setLoading(true);

        const apiService = ApiService.getInstance();
        const { questions } = await apiService.fetchQuestions();

        if (!Array.isArray(questions)) {
          throw new Error('Invalid questions format received from API');
        }

        if (questions.length === 0) {
          throw new Error('No questions available');
        }

        setQuestions(questions);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  /**
   * Handle test completion and calculate score
   * @param answers User's answers to the questions
   */
  const handleTestComplete = (answers: UserAnswer[]) => {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    setUserAnswers(answers);
    setScore(correctAnswers);
  };

  /**
   * Handle quitting the test
   */
  const handleQuit = () => {
    setUserAnswers([]);
    navigate('/');
  };

  // Show loading spinner while fetching questions
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Show error message if questions couldn't be loaded
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 mb-2">Error loading questions:</p>
            <p className="text-gray-600">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main application with routes
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Dashboard onStartTest={() => setUserAnswers([])} />} />
          <Route
            path="/test"
            element={
              <TestScreen
                questions={questions}
                onComplete={handleTestComplete}
                onQuit={handleQuit}
              />
            }
          />
          <Route
            path="/result"
            element={
              userAnswers.length > 0 ? (
                <FeedbackScreen
                  questions={questions}
                  userAnswers={userAnswers}
                  score={score}
                  onRetry={() => {
                    setUserAnswers([]);
                    navigate('/test');
                  }}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
