import axios from 'axios';
import { Question } from '../types';

interface ApiResponse {
  status: string;
  data: {
    testId: string;
    questions: Question[];
  };
  message: string;
}

/**
 * Service class for handling API requests to fetch questions and manage test data
 * @class ApiService
 */
export class ApiService {
  private static instance: ApiService;
  private readonly baseUrl: string;

  private constructor() {
    // In development, use the local API endpoint
    const isDev = import.meta.env.DEV;
    const apiUrl = isDev
      ? '/api'  // This will be proxied to /.netlify/functions/api
      : import.meta.env.VITE_API_URL || 'https://tabishapi.netlify.app/.netlify/functions/api';

    // Remove trailing slash if present
    this.baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * Fetches questions from the API
   * @returns Promise containing the question data
   */
  public async fetchQuestions(): Promise<{ testId: string; questions: Question[] }> {
    try {
      const url = `${this.baseUrl}/data`;
      console.log('Fetching questions from:', url);

      const response = await axios.get<ApiResponse>(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        }
      });

      console.log('Raw API Response:', response);

      if (!response.data || typeof response.data !== 'object') {
        console.error('Invalid response format - not an object:', response.data);
        throw new Error('Invalid API response format');
      }

      if (response.data.status !== 'SUCCESS') {
        console.error('API returned error status:', response.data);
        throw new Error(response.data.message || 'API returned error status');
      }

      if (!response.data.data || !response.data.data.questions) {
        console.error('Missing data or questions in response:', response.data);
        throw new Error('Invalid API response structure');
      }

      const { testId, questions } = response.data.data;

      if (!Array.isArray(questions)) {
        console.error('Questions is not an array:', questions);
        throw new Error('Invalid questions format');
      }

      return { testId, questions };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });
        if (error.response?.status === 404) {
          throw new Error('API endpoint not found');
        }
        throw new Error(`API Error: ${error.message}`);
      }
      console.error('Error fetching questions:', error);
      throw error;
    }
  }

  /**
   * Gets the default timeout duration for questions (in seconds)
   */
  public static getDefaultQuestionTimeout(): number {
    return 90; // Increased from 30 to 90 seconds to give users more time
  }
}
