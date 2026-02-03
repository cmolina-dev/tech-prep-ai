

export interface MetricCardData {
  title: string;
  value: number;
  trend: number;
  label: string;
  icon?: string;
}

export interface FocusWord {
  word: string;
  phonetic: string;
  score: 'Low Score' | 'Medium Score' | 'High Score';
}

export interface GrammarCorrection {
  id: string;
  context: string;
  incorrect: string;
  correct: string;
  explanation: string;
}

export interface PhrasingImprovement {
  id: string;
  original: string;
  improved: string;
}

export interface VocabularyUpskill {
  original: string;
  better: string;
}

export interface InterviewPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  topics: string[];
  isActive?: boolean;
}

export interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

export interface ScoreData {
  category: string;
  score: number;
  label: string;
  color: string;
}

export interface FeedbackItem {
  id: string;
  type: 'strength' | 'improvement' | 'suggestion';
  title: string;
  content: string;
  details?: string[];
}

export interface SessionQuestion {
  id: string;
  question: string;
  answer: string;
  score: number;
  feedback: string;
  startTime: string;
  endTime: string;
}

export interface PerformanceDataPoint {
  session: number;
  score: number;
  date: string;
}

export interface DifficultyOption {
  id: string;
  title: string;
  description: string;
  color: string;
}

export const interviewPaths: InterviewPath[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Master React, CSS architecture, HTML5 semantics, and modern browser APIs.',
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=150&fit=crop',
    topics: ['React', 'DOM', 'Accessibility']
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'System Design, scalable databases, API architecture, and microservices.',
    icon: '⚙️',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=150&fit=crop',
    topics: ['SQL', 'Distributed Systems'],
    isActive: true
  },
  {
    id: 'general-swe',
    title: 'General SWE',
    description: 'Core algorithms, data structures, and general problem solving patterns.',
    icon: '🚀',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=150&fit=crop',
    topics: ['Algorithms', 'Data Structures']
  }
];

export const difficultyOptions: DifficultyOption[] = [
  {
    id: 'junior',
    title: 'Junior / Easy',
    description: 'Fundamentals & basic syntax',
    color: '#22c55e'
  },
  {
    id: 'mid',
    title: 'Mid-Level / Medium',
    description: 'Standard interview questions',
    color: '#3b82f6'
  },
  {
    id: 'senior',
    title: 'Senior / Hard',
    description: 'Complex system design & edge cases',
    color: '#f97316'
  }
];

export const configurationOptions = {
  difficulty: ['Entry Level', 'Mid Level', 'Senior Level', 'Staff Level'],
  duration: ['15 minutes', '30 minutes', '45 minutes', '60 minutes'],
  focus: ['Technical Skills', 'System Design', 'Behavioral', 'Mixed']
};

export const mockMessages: Message[] = [
  {
    id: '1',
    role: 'ai',
    content: "Hi! I'm your Tech Interview AI. Let's start with a frontend question. What would you use to share data across multiple React components, and why would you choose that approach?",
    timestamp: new Date('2024-01-15T10:00:00')
  },
  {
    id: '2',
    role: 'user',
    content: "I would use React Context API for simpler state or Redux for more complex state management. Context is great for theming or auth, while Redux provides better debugging tools and middleware support for async actions.",
    timestamp: new Date('2024-01-15T10:02:00')
  },
  {
    id: '3',
    role: 'ai',
    content: "That's a solid answer! You correctly identified both options and their use cases. Let me follow up with a more specific scenario to test your understanding:\n\nIf you had a large e-commerce application with shopping cart, user preferences, and real-time notifications, how would you structure your state management?",
    timestamp: new Date('2024-01-15T10:03:00')
  },
  {
    id: '4',
    role: 'user',
    content: "For this scenario, I'd use a combination. Redux Toolkit for the shopping cart since it needs to persist and sync across tabs. React Query for product data and real-time updates. Context for user preferences like theme and language. This separates concerns and uses each tool where it excels.",
    timestamp: new Date('2024-01-15T10:05:00')
  },
  {
    id: '5',
    role: 'ai',
    content: "Excellent response! You've demonstrated a sophisticated understanding of state management patterns. Now, let's move on to discuss your approach to CSS architecture...",
    timestamp: new Date('2024-01-15T10:06:00')
  }
];

export const scoreData: ScoreData[] = [
  { category: 'Technical', score: 88, label: 'Strong', color: '#22c55e' },
  { category: 'Clarity', score: 95, label: 'Excellent', color: '#22c55e' },
  { category: 'Depth', score: 92, label: 'Strong', color: '#22c55e' }
];

export const feedbackItems: FeedbackItem[] = [
  {
    id: '1',
    type: 'strength',
    title: 'Structured Communication',
    content: 'Your explanations are exceptionally well-organized. You consistently break down complex concepts into digestible parts, making it easy for interviewers to follow your reasoning.',
    details: [
      'Clear separation of concerns in explanations',
      'Logical progression of ideas',
      'Good use of examples to illustrate points'
    ]
  },
  {
    id: '2',
    type: 'strength',
    title: 'Technical Depth',
    content: 'You demonstrate strong knowledge of modern development practices and can articulate trade-offs effectively.',
    details: [
      'Understanding of performance implications',
      'Awareness of scalability concerns',
      'Knowledge of best practices'
    ]
  },
  {
    id: '3',
    type: 'improvement',
    title: 'Edge Cases',
    content: "Consider proactively discussing edge cases and error handling in your solutions. This shows comprehensive thinking.",
    details: [
      'Discuss error boundaries in React',
      'Mention loading and error states',
      'Consider accessibility edge cases'
    ]
  },
  {
    id: '4',
    type: 'suggestion',
    title: 'System Design Practice',
    content: 'To strengthen your senior-level readiness, practice more system design questions focusing on scalability and distributed systems.',
    details: [
      'Study CAP theorem and its implications',
      'Practice database sharding strategies',
      'Learn about message queues and event-driven architecture'
    ]
  }
];

export const sessionQuestions: SessionQuestion[] = [
  {
    id: '1',
    question: 'Explain the difference between a process and a thread.',
    answer: 'Your answer covered the memory space distinction well. However, you could have elaborated more on the context switching overhead differences. The example about browser tabs was excellent...',
    score: 95,
    feedback: 'Good use of examples, but missed context switching overhead.',
    startTime: '00:15',
    endTime: '02:30'
  },
  {
    id: '2',
    question: 'How would you design a scalable URL shortener?',
    answer: 'Strong start with the capacity estimation. You missed discussing the hash collision strategy in depth. The database choice of NoSQL was well justified...',
    score: 90,
    feedback: 'Solid capacity estimation, weak on hash collisions.',
    startTime: '02:45',
    endTime: '05:10'
  },
  {
    id: '3',
    question: 'Describe a time you had a conflict with a coworker.',
    answer: "This behavioral question was answered with a good STAR method structure. The 'Result' section could be more quantifiable. Your tone was professional and empathetic.",
    score: 88,
    feedback: 'Good STAR method, quantify results more.',
    startTime: '05:20',
    endTime: '07:45'
  }
];

export const performanceHistory: PerformanceDataPoint[] = [
  { session: 1, score: 72, date: '2024-01-01' },
  { session: 2, score: 75, date: '2024-01-05' },
  { session: 3, score: 78, date: '2024-01-10' },
  { session: 4, score: 82, date: '2024-01-15' },
  { session: 5, score: 80, date: '2024-01-20' },
  { session: 6, score: 85, date: '2024-01-25' },
  { session: 7, score: 88, date: '2024-01-30' },
  { session: 8, score: 92, date: '2024-02-02' }
];

export const summaryStats = {
  overallScore: 8.10,
  accuracy: 92,
  confidence: 'High',
  totalSessions: 8,
  totalQuestions: 47,
  averageTime: '32 min',
  improvement: '+20%'
};

export interface TechOption {
  id: string;
  name: string;
  icon: string;
}

export const techOptions: Record<string, TechOption[]> = {
  frontend: [
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'vue', name: 'Vue.js', icon: '💚' },
    { id: 'angular', name: 'Angular', icon: '🅰️' },
    { id: 'nextjs', name: 'Next.js', icon: '▲' },
    { id: 'css', name: 'CSS/HTML', icon: '🎨' },
    { id: 'typescript', name: 'TypeScript', icon: '📘' },
  ],
  backend: [
    { id: 'node', name: 'Node.js', icon: '🟢' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'go', name: 'Go', icon: '🐹' },
    { id: 'sql', name: 'SQL/DB', icon: '🗄️' },
    { id: 'system_design', name: 'System Design', icon: '🏗️' },
  ],
  mobile: [
    { id: 'react_native', name: 'React Native', icon: '⚛️' },
    { id: 'flutter', name: 'Flutter', icon: '🐦' },
    { id: 'ios', name: 'iOS/Swift', icon: '🍎' },
    { id: 'android', name: 'Android', icon: '🤖' },
  ]
};
