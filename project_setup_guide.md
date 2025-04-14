# React Project Setup Guide

## Core Technologies Used

1. **React 18**
   - Functional Components
   - React Hooks (useState, useEffect, useCallback)
   - Custom Hooks (useTimer)
   - React Router for navigation

2. **Additional Technologies**
   - TypeScript for type safety
   - Tailwind CSS for styling
   - Framer Motion for animations
   - JSON Server for mock API

## 1. Create Vite Project with React and TypeScript

```bash
# Create new project
npm create vite@latest sentence-construction -- --template react-ts

# Navigate to project
cd sentence-construction

# Install dependencies
npm install
```

## 2. Add Tailwind CSS

```bash
# Install Tailwind and its dependencies
npm install -D tailwindcss postcss autoprefixer

# Generate Tailwind config
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 3. Install Additional Dependencies

```bash
# Install required packages
npm install framer-motion react-router-dom json-server
```

## 4. Project Structure

Our actual project structure:
```
sentence-construction/
├── src/
│   ├── components/         # React components
│   │   ├── Dashboard.tsx
│   │   ├── Layout.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── TestScreen.tsx
│   │   └── Timer.tsx
│   ├── services/          # API services
│   │   └── api.ts
│   ├── utils/             # Helper functions
│   │   └── helpers.ts
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles (Tailwind)
├── public/              # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 5. Configure TypeScript

Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 6. Setup Mock API

Create `db.json` in root:
```json
{
  "questions": [
    {
      "id": 1,
      "question": "The company's _______ approach to product development _______ customer feedback at every stage, _______ user satisfaction and _______ a loyal consumer base.",
      "options": ["innovative", "incorporates", "enhancing", "building"]
    }
  ]
}
```

Add to `package.json` scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "server": "json-server --watch db.json --port 3000"
  }
}
```

## 7. Run the Project

```bash
# Terminal 1: Start the development server
npm run dev

# Terminal 2: Start the mock API server
npm run server
```

## Key React Features Used:

1. **React Hooks**
```typescript
// useState for state management
const [currentQuestion, setCurrentQuestion] = useState(0);

// useEffect for side effects
useEffect(() => {
  // Timer logic, API calls, etc.
}, [dependencies]);

// useCallback for memoized functions
const handleAnswer = useCallback(() => {
  // Answer handling logic
}, []);
```

2. **Custom Hooks**
```typescript
// Custom Timer Hook
const useTimer = (initialTime: number) => {
  const [time, setTime] = useState(initialTime);
  // Timer logic
  return time;
};
```

3. **React Router**
```typescript
// Route Setup
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/test" element={<TestScreen />} />
</Routes>
```

4. **Component Structure**
```typescript
// Functional Component with TypeScript
const Dashboard: React.FC<DashboardProps> = ({ onStart }) => {
  // Component logic
  return (
    // JSX
  );
};
```

## Key Technical Features:

1. React 18's features for modern web development
2. Tailwind CSS for utility-first styling
3. TypeScript for enhanced development experience
4. Vite for fast development and building
5. JSON Server for rapid prototyping

## Important Files to Create First:

1. `src/types/index.ts` - Define interfaces
2. `src/services/api.ts` - API service
3. `src/components/Layout.tsx` - Base layout
4. `src/components/Dashboard.tsx` - Start screen
5. `src/components/TestScreen.tsx` - Main test interface

This structure matches our actual implementation and follows Vite + React + TypeScript best practices.
