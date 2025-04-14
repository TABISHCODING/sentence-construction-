import axios from 'axios';
import { Question, ApiResponse } from '../types';

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
      : (import.meta.env.VITE_API_URL || '') + '/.netlify/functions/api';

    // Remove trailing slash if present
    this.baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
  }

  /**
   * Get the singleton instance of ApiService
   * @returns The ApiService instance
   */
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

      const response = await axios.get<ApiResponse>(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        }
      });

      // Validate response structure
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid API response format');
      }

      if (response.data.status !== 'SUCCESS') {
        throw new Error(response.data.message || 'API returned error status');
      }

      if (!response.data.data || !response.data.data.questions) {
        throw new Error('Invalid API response structure');
      }

      const { testId, questions } = response.data.data;

      if (!Array.isArray(questions)) {
        throw new Error('Invalid questions format');
      }

      return { testId, questions };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('API endpoint not found');
        }
        throw new Error(`API Error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Gets the default timeout duration for questions (in seconds)
   * @returns The default timeout in seconds
   */
  public static getDefaultQuestionTimeout(): number {
    return 30;
  }
}
