import React, { useState, useEffect } from "react";
import "../../index.css";

const qaData = [
  // Technical Questions
  {
    id: 1,
    category: "Technical",
    difficulty: "Beginner",
    question: "What is the difference between var, let, and const in JavaScript?",
    answer: "var is function-scoped and can be redeclared, let is block-scoped and can be reassigned but not redeclared, and const is block-scoped and cannot be reassigned or redeclared. const is used for constants, let for variables that will change, and var is generally avoided in modern JavaScript due to its hoisting behavior and function scope.",
    tags: ["JavaScript", "Variables", "Scope"]
  },
  {
    id: 2,
    category: "Technical",
    difficulty: "Intermediate",
    question: "How do you optimize React application performance?",
    answer: "Key strategies include: using React.memo() for component memoization, implementing useMemo() and useCallback() hooks, code splitting with lazy loading, optimizing bundle size, minimizing re-renders, using virtual scrolling for large lists, and implementing proper state management to avoid unnecessary updates.",
    tags: ["React", "Performance", "Optimization"]
  },
  {
    id: 3,
    category: "Technical",
    difficulty: "Advanced",
    question: "Explain the concept of closures in JavaScript with examples.",
    answer: "A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. This allows the inner function to 'remember' and access variables from the outer function's scope. Closures are commonly used for data privacy, partial application, and maintaining state in asynchronous operations.",
    tags: ["JavaScript", "Closures", "Scope"]
  },
  {
    id: 4,
    category: "Technical",
    difficulty: "Intermediate",
    question: "What are the principles of RESTful API design?",
    answer: "REST principles include: stateless communication, uniform interface, client-server architecture, cacheability, layered system, and code on demand (optional). Key practices: use HTTP methods correctly (GET, POST, PUT, DELETE), implement proper status codes, design meaningful URLs, use JSON format, implement pagination for large datasets, and ensure proper error handling.",
    tags: ["API", "REST", "Web Services"]
  },
  {
    id: 5,
    category: "Technical",
    difficulty: "Advanced",
    question: "How would you design a scalable microservices architecture?",
    answer: "Key considerations include: service decomposition by business capability, API gateway for routing and authentication, service discovery and load balancing, distributed data management, event-driven communication, monitoring and observability, containerization with Docker, orchestration with Kubernetes, and implementing circuit breakers for fault tolerance.",
    tags: ["Microservices", "Architecture", "Scalability"]
  },
  
  // Behavioral Questions
  {
    id: 6,
    category: "Behavioral",
    difficulty: "Beginner",
    question: "Tell me about a time when you had to work with a difficult team member.",
    answer: "Focus on the situation, your actions, and the positive outcome. Describe how you communicated effectively, found common ground, and maintained professionalism. Emphasize what you learned from the experience and how it made you a better team player.",
    tags: ["Teamwork", "Communication", "Conflict Resolution"]
  },
  {
    id: 7,
    category: "Behavioral",
    difficulty: "Intermediate",
    question: "How do you handle tight deadlines and pressure?",
    answer: "I prioritize tasks based on importance and urgency, break large tasks into smaller manageable chunks, communicate proactively with stakeholders about progress and potential roadblocks, and maintain quality while meeting deadlines. I also practice stress management techniques and ask for help when needed.",
    tags: ["Time Management", "Stress", "Prioritization"]
  },
  {
    id: 8,
    category: "Behavioral",
    difficulty: "Advanced",
    question: "Describe a situation where you had to make a difficult technical decision.",
    answer: "Explain the context, the options you considered, the decision-making process, and the outcome. Focus on how you weighed trade-offs, consulted with stakeholders, and learned from the experience. Demonstrate your analytical thinking and leadership skills.",
    tags: ["Decision Making", "Leadership", "Technical Leadership"]
  },
  
  // System Design Questions
  {
    id: 9,
    category: "System Design",
    difficulty: "Intermediate",
    question: "Design a URL shortening service like bit.ly",
    answer: "Key components: URL shortening algorithm (hash-based or counter-based), database design for storing mappings, caching layer (Redis), load balancer, analytics tracking, rate limiting, and security considerations. Consider scalability, availability, and consistency requirements.",
    tags: ["System Design", "URL Shortener", "Scalability"]
  },
  {
    id: 10,
    category: "System Design",
    difficulty: "Advanced",
    question: "Design a real-time chat application like WhatsApp",
    answer: "Components: WebSocket connections for real-time messaging, message queue system, user authentication, message encryption, push notifications, file sharing, group chat functionality, and message persistence. Consider handling millions of concurrent users and message delivery guarantees.",
    tags: ["System Design", "Real-time", "Messaging"]
  },
  
  // Database Questions
  {
    id: 11,
    category: "Database",
    difficulty: "Intermediate",
    question: "What are the differences between SQL and NoSQL databases?",
    answer: "SQL databases are relational, use structured query language, have ACID properties, and are best for complex queries and transactions. NoSQL databases are non-relational, have flexible schemas, scale horizontally, and are optimized for specific use cases like document storage, key-value pairs, or graph data.",
    tags: ["Database", "SQL", "NoSQL"]
  },
  {
    id: 12,
    category: "Database",
    difficulty: "Advanced",
    question: "How would you optimize a slow database query?",
    answer: "Steps: analyze the query execution plan, add appropriate indexes, rewrite the query if needed, optimize table structure, use query caching, implement database partitioning, and consider read replicas for read-heavy workloads. Monitor query performance and use database profiling tools.",
    tags: ["Database", "Performance", "Optimization"]
  }
];

// Gemini API Configuration
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const InterviewPrep = () => {
  const [openQA, setOpenQA] = useState([]);
  const [activeSection, setActiveSection] = useState("qa");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [progress, setProgress] = useState({});
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  
  // New states for Gemini API integration
  const [apiKey, setApiKey] = useState("");
  const [apiQuestions, setApiQuestions] = useState([]);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [apiError, setApiError] = useState("");

  // Load saved data from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("interviewBookmarks");
    const savedProgress = localStorage.getItem("interviewProgress");
    const savedApiKey = localStorage.getItem("geminiApiKey");
    
    if (savedBookmarks) {
      setBookmarkedQuestions(JSON.parse(savedBookmarks));
    }
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("interviewBookmarks", JSON.stringify(bookmarkedQuestions));
  }, [bookmarkedQuestions]);

  useEffect(() => {
    localStorage.setItem("interviewProgress", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem("geminiApiKey", apiKey);
  }, [apiKey]);

  // Fetch questions from Gemini API
  const fetchGeminiQuestions = async (query) => {
    let currentApiKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!currentApiKey || !currentApiKey.trim()) {
      setApiError("Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env file.");
      return;
    }

    setIsLoadingApi(true);
    setApiError("");
    
    try {
      const prompt = `Generate 10 interview questions and answers about "${query}" for software engineering interviews. 
      
      Format the response as a JSON array with this exact structure:
      [
        {
          "question": "The interview question",
          "answer": "A detailed answer explaining the concept",
          "category": "Technical|Behavioral|System Design",
          "difficulty": "Beginner|Intermediate|Advanced",
          "tags": ["tag1", "tag2", "tag3"]
        }
      ]
      
      Make sure the questions are relevant, practical, and cover different aspects of ${query}. Include a mix of technical, behavioral, and system design questions if applicable.`;

      const response = await fetch(`${GEMINI_API_URL}?key=${currentApiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // Extract the generated text from Gemini response
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        console.error("Gemini API Response:", data);
        throw new Error("No response generated from Gemini API");
      }

      // Try to parse JSON from the response
      let questions = [];
      try {
        // Extract JSON from the response (Gemini might wrap it in markdown)
        const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          questions = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Could not find JSON in response");
        }
      } catch (parseError) {
        console.error("JSON parsing error:", parseError);
        // Fallback: create questions from the query
        questions = generateFallbackQuestions(query);
      }

      // Transform to our format and limit to 10+ questions
      const formattedQuestions = questions.slice(0, 12).map((q, index) => ({
        id: `gemini-${Date.now()}-${index}`,
        category: q.category || "Technical",
        difficulty: q.difficulty || "Intermediate",
        question: q.question || `Interview question about ${query}`,
        answer: q.answer || `This is a sample answer for the question about ${query}.`,
        tags: q.tags || [query]
      }));

      setApiQuestions(formattedQuestions);
    } catch (error) {
      console.error("Gemini API Error:", error);
      console.error("API Key used:", currentApiKey ? "Present" : "Missing");
      
      // Handle quota exceeded error
      if (error.message.includes("429") || error.message.includes("RESOURCE_EXHAUSTED")) {
        setApiError("Free tier quota exceeded. Using fallback questions instead.");
        // Generate fallback questions when quota is exceeded
        const fallbackQuestions = generateFallbackQuestions(query);
        const formattedFallbackQuestions = fallbackQuestions.map((q, index) => ({
          id: `fallback-${Date.now()}-${index}`,
          category: q.category,
          difficulty: q.difficulty,
          question: q.question,
          answer: q.answer,
          tags: q.tags
        }));
        setApiQuestions(formattedFallbackQuestions);
      } else {
        setApiError(`Failed to fetch questions from Gemini API: ${error.message}`);
        setApiQuestions([]);
      }
    } finally {
      setIsLoadingApi(false);
    }
  };

  // Generate fallback questions if API doesn't return proper format
  const generateFallbackQuestions = (query) => {
    return [
      {
        question: `What are the key concepts of ${query}?`,
        answer: `The key concepts of ${query} include fundamental principles, core features, and best practices that are essential for understanding and working with this technology.`,
        category: "Technical",
        difficulty: "Beginner",
        tags: [query, "Fundamentals"]
      },
      {
        question: `How would you implement a solution using ${query}?`,
        answer: `To implement a solution with ${query}, you would need to understand the requirements, design the architecture, and follow best practices for development.`,
        category: "Technical",
        difficulty: "Intermediate",
        tags: [query, "Implementation"]
      },
      {
        question: `What are the common challenges when working with ${query}?`,
        answer: `Common challenges include debugging, performance optimization, compatibility issues, and staying updated with the latest developments.`,
        category: "Technical",
        difficulty: "Intermediate",
        tags: [query, "Challenges"]
      },
      {
        question: `How do you optimize performance in ${query}?`,
        answer: `Performance optimization in ${query} involves identifying bottlenecks, implementing efficient algorithms, and using appropriate tools and techniques.`,
        category: "Technical",
        difficulty: "Advanced",
        tags: [query, "Performance"]
      },
      {
        question: `What are the best practices for ${query}?`,
        answer: `Best practices include following coding standards, implementing proper error handling, using version control, and maintaining documentation.`,
        category: "Technical",
        difficulty: "Intermediate",
        tags: [query, "Best Practices"]
      },
      {
        question: `How would you debug issues in ${query}?`,
        answer: `Debugging involves using logging, debugging tools, systematic problem-solving approaches, and understanding the system architecture.`,
        category: "Technical",
        difficulty: "Intermediate",
        tags: [query, "Debugging"]
      },
      {
        question: `What are the security considerations for ${query}?`,
        answer: `Security considerations include input validation, authentication, authorization, data encryption, and following security best practices.`,
        category: "Technical",
        difficulty: "Advanced",
        tags: [query, "Security"]
      },
      {
        question: `How do you scale applications built with ${query}?`,
        answer: `Scaling involves horizontal and vertical scaling strategies, load balancing, caching, and optimizing database queries.`,
        category: "System Design",
        difficulty: "Advanced",
        tags: [query, "Scaling"]
      },
      {
        question: `What are the testing strategies for ${query}?`,
        answer: `Testing strategies include unit testing, integration testing, end-to-end testing, and automated testing frameworks.`,
        category: "Technical",
        difficulty: "Intermediate",
        tags: [query, "Testing"]
      },
      {
        question: `How do you stay updated with ${query} developments?`,
        answer: `Stay updated by following official documentation, participating in communities, attending conferences, and practicing regularly.`,
        category: "Behavioral",
        difficulty: "Beginner",
        tags: [query, "Learning"]
      }
    ];
  };

  // Handle search with Gemini API integration
  const handleSearch = async (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      await fetchGeminiQuestions(searchTerm.trim());
    }
  };

  const toggleQA = (id) => {
    setOpenQA((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (id) => {
    setBookmarkedQuestions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const markAsReviewed = (id) => {
    setProgress((prev) => ({
      ...prev,
      [id]: { ...prev[id], reviewed: true, reviewedAt: new Date().toISOString() }
    }));
  };

  const markAsUnderstood = (id) => {
    setProgress((prev) => ({
      ...prev,
      [id]: { ...prev[id], understood: true, understoodAt: new Date().toISOString() }
    }));
  };

  const markAsNeedsPractice = (id) => {
    setProgress((prev) => ({
      ...prev,
      [id]: { ...prev[id], needsPractice: true, needsPracticeAt: new Date().toISOString() }
    }));
  };

  // Combine local and API questions
  const allQuestions = [...apiQuestions, ...qaData];
  
  // Filter questions based on search, category, difficulty, and bookmarks
  const filteredQuestions = allQuestions.filter((qa) => {
    const matchesSearch = qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qa.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qa.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || qa.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || qa.difficulty === selectedDifficulty;
    const matchesBookmark = !showBookmarkedOnly || bookmarkedQuestions.includes(qa.id);
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmark;
  });

  // Get unique categories and difficulties
  const categories = ["All", ...new Set(allQuestions.map(qa => qa.category))];
  const difficulties = ["All", ...new Set(allQuestions.map(qa => qa.difficulty))];

  // Calculate progress statistics
  const totalQuestions = allQuestions.length;
  const reviewedQuestions = Object.values(progress).filter(p => p.reviewed).length;
  const understoodQuestions = Object.values(progress).filter(p => p.understood).length;
  const bookmarkedCount = bookmarkedQuestions.length;

  return (
    <div className="interview-prep-container">
      {/* Header */}
      <div className="interview-header">
        <h1 className="interview-title">Interview Preparation</h1>
        <p className="interview-subtitle">
          Master your interview skills with our comprehensive Q&A database and interactive practice sessions.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="progress-overview">
        <div className="progress-card">
          <div className="progress-stat">
            <span className="progress-number">{reviewedQuestions}</span>
            <span className="progress-label">Reviewed</span>
          </div>
          <div className="progress-stat">
            <span className="progress-number">{understoodQuestions}</span>
            <span className="progress-label">Understood</span>
          </div>
          <div className="progress-stat">
            <span className="progress-number">{bookmarkedCount}</span>
            <span className="progress-label">Bookmarked</span>
          </div>
          <div className="progress-stat">
            <span className="progress-number">{totalQuestions}</span>
            <span className="progress-label">Total</span>
          </div>
        </div>
      </div>

      {/* Section Toggle */}
      <div className="section-toggle">
        <button
          className={`toggle-btn ${activeSection === "qa" ? "active" : ""}`}
          onClick={() => setActiveSection("qa")}
        >
          <i className="fas fa-list"></i>
          <span>Q&A Section</span>
        </button>
        <button
          className={`toggle-btn ${activeSection === "chatbot" ? "active" : ""}`}
          onClick={() => setActiveSection("chatbot")}
        >
          <i className="fas fa-comments"></i>
          <span>Chatbot</span>
        </button>
      </div>

      {/* Content Sections */}
      <div className="content-container">
        {/* Q&A Section */}
        <div className={`qa-section ${activeSection === "qa" ? "active" : ""}`}>
          <div className="qa-header">
            <h2>Curated Interview Q&A</h2>
            <p>Browse through curated interview questions and detailed answers to help you prepare effectively.</p>
          </div>
          


          {/* Search and Filters */}
          <div className="search-filters">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search questions, answers, or tags... (Press Enter to generate AI questions)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearch}
              />
            </div>
            
            <div className="filter-controls">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="filter-select"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
              
              <button
                className={`filter-btn ${showBookmarkedOnly ? "active" : ""}`}
                onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
              >
                <i className="fas fa-bookmark"></i>
                Bookmarked Only
              </button>
            </div>
          </div>

          {/* API Loading and Error States */}
          {isLoadingApi && (
            <div style={{ textAlign: 'center', padding: 20, color: 'var(--text-secondary)' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: 24, marginBottom: 8 }}></i>
              <p>Generating AI questions with Gemini...</p>
            </div>
          )}

          {apiError && (
            <div style={{ textAlign: 'center', padding: 12, marginBottom: 16, color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 6 }}>
              <i className="fas fa-exclamation-triangle" style={{ marginRight: 8 }}></i>
              {apiError}
            </div>
          )}

          {/* API Questions Section */}
          {apiQuestions.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: 16, textAlign: 'center' }}>
                <i className="fas fa-robot" style={{ marginRight: 8 }}></i>
                AI-Generated Questions for: "{searchTerm}"
              </h3>
          <div className="qa-grid">
                {apiQuestions.map((qa) => {
              const isOpen = openQA.includes(qa.id);
                  const isBookmarked = bookmarkedQuestions.includes(qa.id);
                  const questionProgress = progress[qa.id] || {};
                  
              return (
                    <div key={qa.id} className={`qa-card ${questionProgress.reviewed ? "reviewed" : ""}`} style={{ borderLeft: '4px solid var(--primary)' }}>
                  {/* Card Header */}
                  <div className="qa-card-header">
                    <div className="qa-meta">
                      <span className={`category-badge ${qa.category.toLowerCase()}`}>
                        {qa.category}
                      </span>
                          <span className={`difficulty-badge ${qa.difficulty.toLowerCase()}`}>
                            {qa.difficulty}
                          </span>
                          <span className="question-number">AI-{qa.id.split('-')[2]}</span>
                        </div>
                        <div className="qa-actions-header">
                          <button
                            className={`bookmark-btn ${isBookmarked ? "bookmarked" : ""}`}
                            onClick={() => toggleBookmark(qa.id)}
                            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                          >
                            <i className={`fas ${isBookmarked ? "fa-bookmark" : "fa-bookmark-o"}`}></i>
                          </button>
                          <button
                            className="toggle-answer-btn"
                            onClick={() => toggleQA(qa.id)}
                            aria-label={isOpen ? "Hide answer" : "Show answer"}
                          >
                            <i className={`fas ${isOpen ? "fa-eye-slash" : "fa-eye"}`}></i>
                          </button>
                        </div>
                      </div>

                      {/* Question */}
                      <div className="question-text">
                        {qa.question}
                      </div>

                      {/* Tags */}
                      <div className="question-tags">
                        {qa.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>

                      {/* Answer */}
                      {isOpen && (
                        <div className="answer-container">
                          <div className="answer-text">
                            {qa.answer}
                          </div>
                        </div>
                      )}

                      {/* Progress Indicators */}
                      <div className="progress-indicators">
                        {questionProgress.reviewed && (
                          <span className="progress-badge reviewed">
                            <i className="fas fa-check"></i> Reviewed
                          </span>
                        )}
                        {questionProgress.understood && (
                          <span className="progress-badge understood">
                            <i className="fas fa-thumbs-up"></i> Understood
                          </span>
                        )}
                        {questionProgress.needsPractice && (
                          <span className="progress-badge needs-practice">
                            <i className="fas fa-exclamation-triangle"></i> Needs Practice
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="qa-actions">
                        <button
                          className="action-btn secondary"
                          onClick={() => toggleQA(qa.id)}
                        >
                          <i className={`fas ${isOpen ? "fa-eye-slash" : "fa-eye"}`}></i>
                          {isOpen ? "Hide Answer" : "Show Answer"}
                        </button>
                        <button 
                          className={`action-btn ${questionProgress.understood ? "success" : "primary"}`}
                          onClick={() => markAsUnderstood(qa.id)}
                        >
                          <i className="fas fa-thumbs-up"></i>
                          {questionProgress.understood ? "Got It" : "Got It"}
                        </button>
                        <button 
                          className={`action-btn ${questionProgress.needsPractice ? "warning" : "secondary"}`}
                          onClick={() => markAsNeedsPractice(qa.id)}
                        >
                          <i className="fas fa-exclamation-triangle"></i>
                          {questionProgress.needsPractice ? "Needs Practice" : "Needs Practice"}
                        </button>
                        <button 
                          className={`action-btn ${questionProgress.reviewed ? "success" : "secondary"}`}
                          onClick={() => markAsReviewed(qa.id)}
                        >
                          <i className="fas fa-check"></i>
                          {questionProgress.reviewed ? "Reviewed" : "Mark Reviewed"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Default Questions Section */}
          {(!searchTerm.trim() || filteredQuestions.some(q => qaData.some(dq => dq.id === q.id))) && (
            <div>
              {apiQuestions.length > 0 && (
                <h3 style={{ color: 'var(--text-secondary)', marginBottom: 16, textAlign: 'center' }}>
                  <i className="fas fa-database" style={{ marginRight: 8 }}></i>
                  Curated Questions
                </h3>
              )}
              <div className="qa-grid">
                {filteredQuestions.filter(qa => qaData.some(dq => dq.id === qa.id)).map((qa) => {
                  const isOpen = openQA.includes(qa.id);
                  const isBookmarked = bookmarkedQuestions.includes(qa.id);
                  const questionProgress = progress[qa.id] || {};
                  
                  return (
                    <div key={qa.id} className={`qa-card ${questionProgress.reviewed ? "reviewed" : ""}`}>
                      {/* Card Header */}
                      <div className="qa-card-header">
                        <div className="qa-meta">
                          <span className={`category-badge ${qa.category.toLowerCase()}`}>
                            {qa.category}
                          </span>
                          <span className={`difficulty-badge ${qa.difficulty.toLowerCase()}`}>
                            {qa.difficulty}
                          </span>
                          <span className="question-number">Q{qa.id}</span>
                        </div>
                        <div className="qa-actions-header">
                          <button
                            className={`bookmark-btn ${isBookmarked ? "bookmarked" : ""}`}
                            onClick={() => toggleBookmark(qa.id)}
                            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                          >
                            <i className={`fas ${isBookmarked ? "fa-bookmark" : "fa-bookmark-o"}`}></i>
                          </button>
                    <button
                      className="toggle-answer-btn"
                      onClick={() => toggleQA(qa.id)}
                      aria-label={isOpen ? "Hide answer" : "Show answer"}
                    >
                      <i className={`fas ${isOpen ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                        </div>
                  </div>

                  {/* Question */}
                  <div className="question-text">
                    {qa.question}
                  </div>

                      {/* Tags */}
                      <div className="question-tags">
                        {qa.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>

                  {/* Answer */}
                  {isOpen && (
                    <div className="answer-container">
                      <div className="answer-text">
                        {qa.answer}
                      </div>
                    </div>
                  )}

                      {/* Progress Indicators */}
                      <div className="progress-indicators">
                        {questionProgress.reviewed && (
                          <span className="progress-badge reviewed">
                            <i className="fas fa-check"></i> Reviewed
                          </span>
                        )}
                        {questionProgress.understood && (
                          <span className="progress-badge understood">
                            <i className="fas fa-thumbs-up"></i> Understood
                          </span>
                        )}
                        {questionProgress.needsPractice && (
                          <span className="progress-badge needs-practice">
                            <i className="fas fa-exclamation-triangle"></i> Needs Practice
                          </span>
                        )}
                      </div>

                  {/* Actions */}
                  <div className="qa-actions">
                    <button
                      className="action-btn secondary"
                      onClick={() => toggleQA(qa.id)}
                    >
                      <i className={`fas ${isOpen ? "fa-eye-slash" : "fa-eye"}`}></i>
                      {isOpen ? "Hide Answer" : "Show Answer"}
                    </button>
                        <button 
                          className={`action-btn ${questionProgress.understood ? "success" : "primary"}`}
                          onClick={() => markAsUnderstood(qa.id)}
                        >
                      <i className="fas fa-thumbs-up"></i>
                          {questionProgress.understood ? "Got It" : "Got It"}
                        </button>
                        <button 
                          className={`action-btn ${questionProgress.needsPractice ? "warning" : "secondary"}`}
                          onClick={() => markAsNeedsPractice(qa.id)}
                        >
                          <i className="fas fa-exclamation-triangle"></i>
                          {questionProgress.needsPractice ? "Needs Practice" : "Needs Practice"}
                    </button>
                        <button 
                          className={`action-btn ${questionProgress.reviewed ? "success" : "secondary"}`}
                          onClick={() => markAsReviewed(qa.id)}
                        >
                          <i className="fas fa-check"></i>
                          {questionProgress.reviewed ? "Reviewed" : "Mark Reviewed"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
            </div>
          )}

          {filteredQuestions.length === 0 && !isLoadingApi && (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No questions found</h3>
              <p>Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>

        {/* Chatbot Section */}
        <div className={`chatbot-section ${activeSection === "chatbot" ? "active" : ""}`}>
          <div className="chatbot-header">
            <h2>Mock Interview Chatbot</h2>
            <p>Practice with our AI interviewer. Answer questions and receive real-time feedback to improve your responses.</p>
          </div>
          
          <div className="chatbot-container">
            <div className="chatbot-placeholder">
              <i className="fas fa-robot"></i>
              <h3>Coming Soon!</h3>
              <p>Our AI-powered interview chatbot is under development.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterviewPrep;
