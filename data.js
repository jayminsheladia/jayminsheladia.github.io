// All portfolio content lives here. Edit this file to update the site —
// index.html and script.js just render whatever is in this object.
const PORTFOLIO = {
  profile: {
    name: "Jaymin Sheladia",
    initials: "JS",
    title: "Software Engineer · ML/AI",
    tagline:
      "MS CS student at USC shipping production-grade AI systems and full-stack platforms — from an LLM router that cut inference costs 28% to a 99.25%-accurate deep learning model backed by published research.",
    location: "Los Angeles, CA",
    email: "jayminsheladia17@gmail.com",
    secondaryEmail: "sheladia@usc.edu",
    phone: "+1 (213) 331-9625",
    photo: "assets/profile.jpeg",
    resume: "assets/Jaymin_Sheladia_Resume.pdf",
    links: {
      github: "https://github.com/jayminsheladia",
      linkedin: "https://linkedin.com/in/jayminsheladia",
      leetcode: "https://leetcode.com/Jayminsheladia",
    },
    githubUsername: "jayminsheladia",
  },

  // shown as animated counters in the stats strip below the hero
  stats: [
    { value: 17, suffix: "+", label: "Projects Shipped" },
    { value: 2, suffix: "", label: "Internships" },
    { value: 1, suffix: "", label: "Published Paper" },
    { value: 99.25, suffix: "%", label: "Top Model Accuracy" },
  ],

  education: [
    {
      school: "University of Southern California",
      location: "Los Angeles, USA",
      degree: "Master of Science in Computer Science",
      date: "January 2026 – December 2027",
      note: "Coursework: Analysis of Algorithms, Agentic AI, Applied NLP, Web Technologies, Database Systems",
    },
    {
      school: "Graphic Era Deemed to be University",
      location: "Dehradun, India",
      degree: "B.Tech in Computer Science and Engineering",
      date: "October 2021 – June 2025",
      note: "Coursework: Operating Systems, Network & System Security, Computer Networks, OOPs, Software Engineering",
    },
  ],

  certifications: [
    {
      name: "IBM Machine Learning Professional Certificate",
      issuer: "Coursera",
      date: "2024",
      url: "https://www.coursera.org/account/accomplishments/specialization/YN945H05XAT5",
    },
  ],

  skills: {
    Languages: ["C", "C++", "Python", "Java", "Go", "JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
    "Frameworks / Libraries": [
      "React",
      "Angular",
      "Node.js",
      "Express.js",
      "Spring Boot",
      "Flask",
      "Django",
      "FastAPI",
      "Next.js",
      "GraphQL",
      "TensorFlow",
      "PyTorch",
      "Keras",
      "OpenCV",
      "Scikit-learn",
      "Pandas",
      "SpaCy",
      "YOLOv11",
      "OpenAI API",
      "Claude API",
    ],
    "Databases": ["MySQL", "MongoDB", "PostgreSQL", "Redis"],
    "Tools": [
      "Git",
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "AWS",
      "Firebase",
      "VS Code",
      "PyCharm",
      "Jupyter Notebook",
      "Postman",
      "GDB",
      "GCC",
    ],
    "Concepts": [
      "Data Structures & Algorithms",
      "Distributed Systems",
      "RESTful API Design",
      "CI/CD",
      "Unix/Linux",
      "Reinforcement Learning",
      "Time Series Analysis",
      "Microservices",
      "Query Optimization",
      "RAG",
    ],
  },

  experience: [
    {
      company: "Cognizant Technology Solutions",
      role: "Programmer Analyst Trainee – Software Engineering",
      location: "Coimbatore, India",
      date: "May 2025 – September 2025",
      bullets: [
        "Engineered a full-stack Travel Planner and Booking System, designing 10+ RESTful APIs in Spring Boot and Angular to modernize manual booking workflows and centralize itinerary, booking, and preference management.",
        "Integrated a Generative AI-based recommendation engine analyzing user interests, budget, and trip duration to surface personalized suggestions that simplified the booking decision process.",
      ],
    },
    {
      company: "CODTECH IT Solutions",
      role: "Machine Learning Intern",
      location: "Remote",
      date: "June 2024 – August 2024",
      bullets: [
        "Designed and trained a fraud detection model applying anomaly detection and supervised learning on 200,000+ credit card transactions, reaching 98% accuracy.",
        "Optimized algorithms and rebuilt data preprocessing pipelines for existing production models, enhancing accuracy by 12–15% across multiple live ML projects.",
      ],
    },
  ],

  research: [
    {
      title: "Deep Learning Approach for Malicious URL Detection",
      role: "Co-author · Published Research Paper",
      date: "2025",
      bullets: [
        "Compared 4 deep learning architectures (CNN, RNN, LSTM, Bi-LSTM) for malicious URL detection, engineering character-level preprocessing pipelines on the IEEE Dataport dataset.",
        "Achieved 99.25% accuracy with the Bi-LSTM model, outperforming CNN (86.5%), LSTM (63.75%), and RNN (53%) baselines.",
      ],
    },
  ],

  leadership: [
    {
      role: "Event Operations Coordinator — TEDxGraphicEraUniversity",
      date: "2024",
      detail:
        "Led a 10-member volunteer team across stage coordination and session transitions; coordinated speaker travel, accommodation, and on-site scheduling.",
    },
    {
      role: "Organizing Committee Member — Graph-E-Thon 1.0 & 2.0 (National Hackathon)",
      date: "2023 – 2024",
      detail:
        "Managed registration, scheduling, and volunteer coordination for two editions of a 72-hour hackathon supporting 1,000+ participants.",
    },
    {
      role: "Active Member — Finance and Investment Cell, Graphic Era University",
      date: "2021 – 2024",
      detail:
        "Co-organized Decryptonite 2.0 (finance quiz, 300+ attendees) and contributed to market-simulation and speaker-series events.",
    },
  ],

  // tags are used for the filter bar in the Projects section
  projects: [
    {
      title: "Agent Reliability Infrastructure (ARI)",
      date: "August 2026",
      tags: ["Featured", "Full-Stack", "AI/ML"],
      description:
        "End-to-end control-plane layer for multi-agent LLM systems, sitting between an orchestrator and the underlying model calls to solve problems agent frameworks leave open: curated context hand-off between agents via similarity+recency retrieval over embedded step outputs, human-approval gates on risky tool calls through a Redis-backed queue, full CLI/web trace-replay debugging, and inline loop/cost-anomaly detection. A real 5-step agent pipeline (researcher → drafter → reviewer → notifier → executor) exercises all four mechanisms together in a live demo, backed by Postgres/pgvector, Redis, and 17 passing tests.",
      stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Redis", "Claude API", "SQLAlchemy", "Alembic"],
      github: "https://github.com/jayminsheladia/agent-reliability-infrastructure",
    },
    {
      title: "Model Router: Policy-Aware LLM Routing Layer",
      date: "July 2026 – August 2026",
      tags: ["Featured", "Full-Stack", "AI/ML"],
      description:
        "Policy-aware routing layer for LLM requests that goes beyond prompt-complexity routing (RouteLLM, LiteLLM) by adding identity, per-project authorization, budget enforcement, and a full audit trail — plus a Quality/Cost/Balanced routing dial, automatic tier failover on real Groq API errors, and per-user conversation memory. Benchmarked the heuristic classifier against a 30-prompt hand-labeled oracle using live Groq calls, reaching 100% accuracy (up from an initial 80%) while cutting inference cost 27.9% versus always routing to the frontier tier.",
      stack: ["Python", "FastAPI", "SQLite", "Groq API", "Claude API", "Pydantic"],
      github: "https://github.com/jayminsheladia/Model_Router",
    },
    {
      title: "AI Research Assistant",
      date: "June 2026 – July 2026",
      tags: ["Featured", "Full-Stack", "AI/ML"],
      description:
        "Full-stack research assistant with a FastAPI/PostgreSQL (pgvector) backend and Next.js frontend, featuring RAG-based paper chat, citation-aware related-work search, and a knowledge graph across ingested papers. Benchmarked the ingestion pipeline against live Gemini and Voyage API calls, achieving end-to-end processing in under 4.3 seconds per paper.",
      stack: ["FastAPI", "PostgreSQL", "pgvector", "Next.js", "Gemini API", "Voyage API"],
      github: "https://github.com/jayminsheladia/AI-Powered-Personal-Research-Assistant",
    },
    {
      title: "Smart Cards: AI-Powered Adaptive Flashcards",
      date: "July 2026",
      tags: ["AI/ML"],
      description:
        "AI-powered study tool that turns raw lecture notes into an adaptive spaced-repetition flashcard system, using an LLM to grade short-answer responses against a rubric instead of binary flip-cards. A modified SM-2 scheduler derives its quality signal from the LLM's continuous grading score and damps interval growth for cards judged inherently harder at generation time.",
      stack: ["Python", "Streamlit", "Gemini API", "SQLite"],
      github: "https://github.com/jayminsheladia/Smart-Cards",
    },
    {
      title: "TechHire: AI-Powered Job Search Platform",
      date: "May 2026 – June 2026",
      tags: ["Featured", "Full-Stack", "AI/ML"],
      description:
        "Full-stack job search platform with a React/Vite frontend and FastAPI/PostgreSQL backend, simplifying job discovery with filters across 6 dimensions including skills, salary, and visa sponsorship. Uses the Groq API to auto-generate AI job summaries, plus resume upload, text extraction, and resume-to-job comparison, backed by automated Python scrapers pulling live listings.",
      stack: ["React", "Vite", "FastAPI", "PostgreSQL", "Groq API", "Python"],
      github: "https://github.com/jayminsheladia/TechHire",
    },
    {
      title: "Sequence Alignment: DP vs. Divide & Conquer",
      date: "March 2026 – April 2026",
      tags: ["Featured", "Algorithms"],
      description:
        "Implemented and benchmarked the classical Needleman-Wunsch dynamic programming algorithm against Hirschberg's memory-efficient divide-and-conquer approach for large genomic sequence inputs. Reduced memory usage from O(m×n) to O(m+n), cutting peak memory consumption by up to 90% on large inputs while preserving identical optimal alignments.",
      stack: ["Python"],
      github: "https://github.com/jayminsheladia/Sequence-Alignment",
    },
    {
      title: "Real-Time Sign Language Detection",
      date: "July 2025 – August 2025",
      tags: ["Featured", "AI/ML", "Computer Vision"],
      description:
        "Real-time computer vision system using OpenCV and TensorFlow to classify hand gestures into text for gesture translation, achieving 98% accuracy across a diverse gesture set. Trained and fine-tuned a Keras-based deep learning model on a custom gesture dataset, optimizing preprocessing and inference for smooth, low-latency video translation.",
      stack: ["Python", "OpenCV", "TensorFlow", "Keras"],
      github: "https://github.com/jayminsheladia/Real-Time-Sign-Language-Detection",
    },
    {
      title: "Mind-Map: BERT Sentiment Analysis",
      date: "December 2024 – May 2025",
      tags: ["AI/ML"],
      description:
        "Flask web app that classifies text sentiment (Negative/Neutral/Positive) using a fine-tuned BERT model, with the tokenizer and model weights pulled from Google Drive at startup and served through a simple web form for real-time inference.",
      stack: ["Python", "Flask", "BERT", "Transformers", "TensorFlow"],
      github: "https://github.com/jayminsheladia/Mind-Map",
    },
    {
      title: "Credit Card Fraud Detection System",
      date: "July 2024 – September 2024",
      tags: ["AI/ML"],
      description:
        "Fraud detection model trained on 200,000+ credit card transactions using anomaly detection and supervised learning, reaching 98% accuracy — the project behind the CODTECH ML internship work.",
      stack: ["Python", "Scikit-learn"],
      github: "https://github.com/jayminsheladia/Credit-Card-Fraud-Detection-System",
    },
    {
      title: "Fitness Tracker",
      date: "July 2024 – September 2024",
      tags: ["Full-Stack"],
      description:
        "MERN-stack fitness tracker for logging users and recording the date/duration of fitness activities, with a Material UI front end for a clean tracking experience.",
      stack: ["MongoDB", "Express.js", "React", "Node.js", "Material UI"],
      github: "https://github.com/jayminsheladia/Fitness-Tracker-App",
    },
    {
      title: "Text-to-Image Classification",
      date: "July 2024 – September 2024",
      tags: ["AI/ML"],
      description:
        "Explores text-to-image generation using MinDALL·E, a lightweight variant of OpenAI's DALL·E, to generate visually coherent images conditioned on natural-language text prompts.",
      stack: ["Python", "MinDALL-E", "Jupyter Notebook"],
      github: "https://github.com/jayminsheladia/Text-To-Image-Classification",
    },
    {
      title: "Easy Rental: E-Commerce Website",
      date: "April 2024 – May 2024",
      tags: ["Full-Stack"],
      description:
        "Full MERN-stack marketplace for buying, selling, and renting new and second-hand items, improving transaction processing speed by 30% and enhancing the overall user experience.",
      stack: ["MongoDB", "Express.js", "React", "Node.js"],
      github: "https://github.com/jayminsheladia/Easy-Rental-System",
    },
    {
      title: "Chat-Bot",
      date: "January 2024 – March 2024",
      tags: ["AI/ML"],
      description:
        "Interactive chatbot with expertise across multiple domains, integrating a dynamic newspaper library for real-time information retrieval so responses stay current and accurate.",
      stack: ["Python"],
      github: "https://github.com/jayminsheladia/Chat-Bot",
    },
    {
      title: "Intrusion Detection System",
      date: "December 2023 – February 2024",
      tags: ["AI/ML", "Security"],
      description:
        "Deep learning-based intrusion detection system powered by a convolutional neural network, paired with a Flask GUI for interactive threat monitoring — detecting and flagging potential network intrusions in real time.",
      stack: ["Python", "CNN", "Flask"],
      github: "https://github.com/jayminsheladia/Intrusion-Detection-System",
    },
    {
      title: "Malware & Phishing Detection System",
      date: "July 2023 – September 2023",
      tags: ["AI/ML", "Security"],
      description:
        "Cybersecurity tool that identifies and flags phishing websites/malicious URLs using a Logistic Regression classifier, wrapped in a user-friendly Java GUI for accessible, real-time scanning.",
      stack: ["Java", "Logistic Regression"],
      github: "https://github.com/jayminsheladia/Malware-Detection-System",
    },
    {
      title: "Blog Post Website",
      date: "July 2023 – September 2023",
      tags: ["Full-Stack"],
      description:
        "Full-featured blogging platform built with Flask and SQLAlchemy, giving bloggers and readers a polished, user-friendly publishing experience.",
      stack: ["Flask", "SQLAlchemy", "HTML/CSS"],
      github: "https://github.com/jayminsheladia/Blog-Post-Website",
    },
    {
      title: "Weather Forecasting System",
      date: "July 2023 – September 2023",
      tags: ["Full-Stack"],
      description:
        "Weather lookup application powered by the OpenWeather API with a Django-based GUI, bringing accurate, real-time forecasts to users in a clean interface.",
      stack: ["Django", "OpenWeather API", "CSS"],
      github: "https://github.com/jayminsheladia/Weather-Forecasting-System",
    },
  ],
};
