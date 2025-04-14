# Sentence Construction App

A modern React application for testing and improving sentence construction skills. This application provides an interactive interface for users to practice constructing grammatically correct sentences by arranging words in the proper order.

## Live Demo

Frontend: [https://tabishh.netlify.app/](https://tabishh.netlify.app/)

## Features

- **Interactive Sentence Construction**: Drag and drop interface for arranging words to form complete sentences
- **Real-time Feedback**: Immediate feedback on correct and incorrect answers
- **Progress Tracking**: Track your progress through the test
- **Score Summary**: Detailed feedback on completion with final score
- **Responsive Design**: Works on desktop and mobile devices
- **Serverless Architecture**: Backend API implemented as Netlify Functions

## Tech Stack

### Frontend
- **React 18**: Modern UI library with functional components and hooks
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Fast build tool and development server
- **React Router**: For client-side routing
- **Axios**: For API requests
- **Framer Motion**: For animations

### Backend
- **Netlify Functions**: Serverless functions for the API
- **Node.js**: JavaScript runtime for the API

## Project Structure

```
sentence-construction/
├── netlify/
│   └── functions/         # Serverless functions for API
│       └── api.js         # Main API function
├── public/                # Static assets
│   └── _redirects         # Netlify redirect rules
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard.tsx
│   │   ├── FeedbackScreen.tsx
│   │   ├── Layout.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── TestScreen.tsx
│   │   └── Timer.tsx
│   ├── services/          # API services
│   │   └── api.ts         # API client
│   ├── types/             # TypeScript types
│   │   └── index.ts       # Type definitions
│   ├── utils/             # Helper functions
│   │   └── helpers.ts     # Utility functions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles (Tailwind)
├── .env                  # Environment variables
├── .env.development      # Development environment variables
├── .env.production       # Production environment variables
├── db.json               # Question data
├── index.html            # HTML entry point
├── netlify.toml          # Netlify configuration
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/TABISHCODING/sentence-construction-.git
   cd sentence-construction-
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. To test with the Netlify Functions locally
   ```bash
   npm run netlify-dev
   ```

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment

This project is configured for deployment on Netlify. The frontend and API are combined in a single repository for easier deployment.

### Netlify Deployment Steps

1. Connect your GitHub repository to Netlify
2. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables in Netlify dashboard:
   - `VITE_API_URL`: Your Netlify site URL (e.g., https://tabishh.netlify.app)

## Development Notes

### API Integration

The application uses a serverless API implemented with Netlify Functions. The API provides question data for the sentence construction exercises.

- API Endpoint: `/.netlify/functions/api/data`
- Local Development: The API is proxied through Vite's development server

### Environment Variables

- `.env.development`: Configuration for development environment
- `.env.production`: Configuration for production environment

### TypeScript and Helper Functions

The project uses TypeScript for type safety. The `helpers.ts` file contains utility functions for:

- Formatting time (formatTime)
- Parsing question text (parseQuestionText)
- Calculating scores (calculateScore)
- Checking answers (checkAnswer)
- Managing question navigation (getNextQuestionIndex, getPreviousQuestionIndex)
- Calculating progress (calculateProgress)
- Creating user answer objects (createUserAnswer)
- Shuffling arrays (shuffleArray)
- Formatting dates (formatDate)
- String manipulation (truncateString)
- Function utilities (debounce)

## License

This project is licensed under the MIT License.
