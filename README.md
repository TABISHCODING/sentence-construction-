# Sentence Construction App

A React-based application for testing sentence construction skills with a focus on proper sentence structure and word placement.

## Features
- Interactive sentence construction test with 10 questions
- Drag-and-drop word placement interface
- 30-second timer for each question
- Real-time progress tracking
- Detailed feedback and scoring on completion
- Responsive design for all device sizes

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animation**: Framer Motion for smooth transitions
- **Routing**: React Router for navigation
- **Build Tool**: Vite for fast development and optimized builds
- **Backend**: Netlify Functions (serverless)
- **Deployment**: Netlify for both frontend and API

## Live Demo
- Frontend: [tabishh.netlify.app](https://tabishh.netlify.app)
- API: [tabishapi.netlify.app](https://tabishapi.netlify.app)

## Project Structure
```
sentence-construction/
├── src/
│   ├── components/         # React components
│   │   ├── Dashboard.tsx   # Home screen
│   │   ├── FeedbackScreen.tsx # Results screen
│   │   ├── Layout.tsx      # Common layout wrapper
│   │   ├── ProgressBar.tsx # Question progress indicator
│   │   ├── TestScreen.tsx  # Main test interface
│   │   └── Timer.tsx       # Countdown timer
│   ├── services/           # API services
│   │   └── api.ts          # API client
│   ├── utils/              # Helper functions
│   │   └── helpers.ts      # Utility functions
│   ├── types/              # TypeScript types
│   │   └── index.ts        # Type definitions
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── netlify/
│   └── functions/          # Serverless functions
│       └── api-v2.js       # API endpoint with questions
├── public/                 # Static assets
└── netlify.toml            # Netlify configuration
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

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

4. For local API development
   ```bash
   npm run serve
   ```

## Deployment
The application is configured for automatic deployment to Netlify when changes are pushed to the main branch.

## How It Works
1. Users start the test from the dashboard
2. For each question, users must place words in the correct blanks
3. A 30-second timer counts down for each question
4. After completing all questions, users receive a detailed score report

## License
MIT
