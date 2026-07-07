export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  dioramaConcept: string;
  links: { [key: string]: string };
  screenshots: string[];
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: 'trak',
    title: 'TRAK — AI News Credibility Platform',
    tagline: 'Capstone: React Native + Django + a 3-model credibility ensemble',
    description: 'A comprehensive platform designed to combat misinformation by analyzing articles using an ensemble of RoBERTa, DeBERTa, and other custom classifiers. Features a mobile app client, a robust backend parser, and real-time news credibility score visualization.',
    tech: ['React Native', 'Django/DRF', 'MongoDB', 'RoBERTa', 'DeBERTa', 'JWT'],
    dioramaConcept: 'A rotating smartphone displaying credibility metrics.',
    links: { app: 'https://github.com/Danyal-0276/TRAK', backend: 'https://github.com/Danyal-0276/TRAK-BACKEND' },
    screenshots: [
      '/projects/trak/1.png',
      '/projects/trak/2.png',
      '/projects/trak/3.png',
      '/projects/trak/4.png',
      '/projects/trak/5.png',
      '/projects/trak/6.png',
      '/projects/trak/7.png',
      '/projects/trak/8.png',
      '/projects/trak/9.png',
      '/projects/trak/10.png',
      '/projects/trak/11.png',
      '/projects/trak/12.png',
      '/projects/trak/13.png',
      '/projects/trak/14.png',
      '/projects/trak/15.jpeg'
    ],
    accentColor: '#06b6d4', // Teal-cyan
  },
  {
    id: 'pos-ecosystem',
    title: 'POS Ecosystem',
    tagline: 'Three connected repos powering two live restaurant clients',
    description: 'A commercial-grade Point of Sale (POS) ecosystem deployed across two live restaurant clients. Incorporates a dynamic React customer frontend, a management dashboard (POS-Admin), and a high-performance Express API cached with Redis.',
    tech: ['Next.js 16', 'Express', 'MongoDB', 'JWT', 'Redis', 'Swagger'],
    dioramaConcept: 'Linked terminals showing order feeds and glow paths.',
    links: { pos: 'https://github.com/Danyal-0276/POS-client', admin: 'https://github.com/Danyal-0276/POS-Admin', api: 'https://github.com/Danyal-0276/POS-backend' },
    screenshots: [
      '/projects/pos/1.jpeg',
      '/projects/pos/2.jpeg',
      '/projects/pos/3.jpeg'
    ],
    accentColor: '#f59e0b', // Amber-yellow
  },
  {
    id: 'bert-benchmark',
    title: 'BERT-Family Fake News Benchmark',
    tagline: '10 models evaluated on a 10K dataset split',
    description: 'A deep-learning comparison benchmarking RoBERTa, DistilBERT, MobileBERT, XLM-RoBERTa, and other Transformer architectures. Analyzed over a 10K news split using PyTorch and HuggingFace, focusing on Matthews Correlation Coefficient (MCC) and AUC-ROC curves.',
    tech: ['PyTorch', 'HuggingFace Transformers', 'scikit-learn', 'Pandas'],
    dioramaConcept: 'Ten physical glass columns reflecting performance metrics.',
    links: { repo: 'https://github.com/Danyal-0276/Bert-Based-models-evaluation' },
    screenshots: [
      '/projects/bert/1.png',
      '/projects/bert/2.png'
    ],
    accentColor: '#8b5cf6', // Violet
  },
  {
    id: 'nids',
    title: 'Network Intrusion Detection System',
    tagline: 'PDC coursework: Spark MLlib ensemble on CIC-IDS2017',
    description: 'A distributed systems-level network analyzer processing network traffic packet datasets. Built on Apache Spark with PySpark, utilizing an ensemble of Naive Bayes, Logistic Regression, Gradient Boosted Trees, and Random Forests to detect cyber attacks in real-time.',
    tech: ['PySpark 3.5', 'Apache Spark', 'Naive Bayes/LR/GBT/RF ensemble'],
    dioramaConcept: 'A shimmering grid with Spark pipelines running towards a security shield.',
    links: { repo: 'https://github.com/Danyal-0276/PDC-Project-Intrusion-Detection-System-' },
    screenshots: [
      '/projects/nids/1.png',
      '/projects/nids/2.png',
      '/projects/nids/3.png',
      '/projects/nids/4.png',
      '/projects/nids/5.png',
      '/projects/nids/6.png'
    ],
    accentColor: '#ef4444', // Red-coral
  },
  {
    id: 'jarvis',
    title: 'J.A.R.V.I.S — Personal AI Assistant',
    tagline: 'Gemini-powered desktop assistant with a 3D particle voice UI',
    description: 'A personalized desktop assistant powered by Google Gemini APIs. Interfaces system-level capabilities with Python and Eel, featuring voice recognition, local audio synthesizers (pyttsx3), and an interactive 3D particle visualizer that responds dynamically to speech.',
    tech: ['Python', 'Eel', 'Google Gemini', 'SpeechRecognition', 'pyttsx3'],
    dioramaConcept: 'An active, breathing particle sphere that interacts with input.',
    links: { repo: 'https://github.com/Danyal-0276/Jarvis' },
    screenshots: [],
    accentColor: '#3b82f6', // Bright Blue
  }
];

export const secondaryProjects = [
  {
    title: 'Duolingo Clone Android App',
    description: 'A fully functional mobile application cloning Duolingo\'s interface and core gamified language learning loop, built for Android.',
    tech: ['Kotlin', 'Android SDK', 'SQLite'],
    screenshots: [
      '/projects/duolingo/1.png',
      '/projects/duolingo/2.png',
      '/projects/duolingo/3.png',
      '/projects/duolingo/4.png',
      '/projects/duolingo/5.png',
      '/projects/duolingo/6.png',
      '/projects/duolingo/7.png',
      '/projects/duolingo/8.png',
      '/projects/duolingo/9.png',
      '/projects/duolingo/10.png',
      '/projects/duolingo/11.png',
      '/projects/duolingo/12.png',
      '/projects/duolingo/13.png'
    ],
    accentColor: '#10b981' // Green
  },
  {
    title: 'Multi-Marketplace Scraper',
    description: 'A highly resilient web scraping pipeline capable of pulling product listings, pricing updates, and reviews from multiple online marketplaces concurrently.',
    tech: ['Python', 'Selenium', 'BeautifulSoup', 'PostgreSQL'],
    accentColor: '#6366f1' // Indigo
  },
  {
    title: '18 Vanilla JS Mini-Projects',
    description: 'A comprehensive collection of 18 foundational JavaScript mini-projects (Calculator, Weather, Todo, Quiz, etc.) demonstrating core browser API skills.',
    tech: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    screenshots: [
      '/projects/js/1.png'
    ],
    accentColor: '#eab308' // Yellow
  }
];

export const skills = [
  { name: 'JavaScript', category: 'Languages', level: 95 },
  { name: 'TypeScript', category: 'Languages', level: 90 },
  { name: 'Python', category: 'Languages', level: 90 },
  { name: 'Kotlin', category: 'Languages', level: 75 },
  { name: 'SQL', category: 'Languages', level: 80 },
  { name: 'C++', category: 'Languages', level: 70 },
  
  { name: 'Next.js', category: 'Frameworks', level: 90 },
  { name: 'React / Native', category: 'Frameworks', level: 90 },
  { name: 'Django / DRF', category: 'Frameworks', level: 85 },
  { name: 'Express', category: 'Frameworks', level: 85 },
  
  { name: 'PyTorch', category: 'AI/ML', level: 80 },
  { name: 'Transformers', category: 'AI/ML', level: 80 },
  { name: 'BERT Models', category: 'AI/ML', level: 85 },
  { name: 'Apache Spark', category: 'AI/ML', level: 75 },
  
  { name: 'MongoDB', category: 'Databases', level: 85 },
  { name: 'PostgreSQL', category: 'Databases', level: 80 },
  { name: 'Redis', category: 'Databases', level: 75 },
  
  { name: 'Git & GitHub', category: 'Tools', level: 90 },
  { name: 'Docker', category: 'Tools', level: 75 },
  { name: 'Linux', category: 'Tools', level: 80 }
];
