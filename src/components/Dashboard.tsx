import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Layout } from './Layout';

interface DashboardProps {
  onStartTest: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartTest }) => {
  const navigate = useNavigate();

  return (
    <Layout title="MD TABISH" showQuit={false}>
      <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
        <motion.h1 
          className="text-3xl font-semibold text-blue-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Sentence Construction Test
        </motion.h1>
        
        <motion.p 
          className="text-gray-600 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Test your language skills by constructing sentences with the given words.
        </motion.p>

        <motion.div 
          className="w-full bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <span className="text-sm text-gray-600">Time per Question</span>
              <span className="text-sm font-medium">30 seconds</span>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <span className="text-sm text-gray-600">Total Questions</span>
              <span className="text-sm font-medium">10 questions</span>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <span className="text-sm text-gray-600">Estimated Duration</span>
              <span className="text-sm font-medium">5 minutes</span>
            </div>
          </div>
        </motion.div>

        <motion.button
          onClick={() => {
            onStartTest();
            navigate('/test');
          }}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Start Test
        </motion.button>
      </div>
    </Layout>
  );
};
