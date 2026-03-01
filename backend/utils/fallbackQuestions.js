export function getFallbackQuestion(role, difficulty) {
  const questions = {
    "Backend Developer": {
      Easy: "What is REST API?",
      Medium: "Explain middleware in Express.",
      Hard: "Design a scalable authentication system."
    },
    "Frontend Developer": {
      Easy: "What is DOM?",
      Medium: "Explain React lifecycle.",
      Hard: "How would you optimize a large React app?"
    },
    "Full Stack Developer": {
      Easy: "What is the difference between frontend and backend?",
      Medium: "How do you structure authentication in a full stack app?",
      Hard: "Design a full stack architecture for a real-time collaboration tool."
    },
    "Java Developer": {
      Easy: "What is JVM and why is it important?",
      Medium: "Explain the difference between HashMap and ConcurrentHashMap.",
      Hard: "Design a thread-safe high-throughput order processing service in Java."
    },
    "Python Developer": {
      Easy: "What are Python decorators?",
      Medium: "Explain the difference between deep copy and shallow copy.",
      Hard: "Design a scalable Python service for processing background jobs."
    },
    "Node.js Developer": {
      Easy: "What is the event loop in Node.js?",
      Medium: "How does asynchronous error handling work in Node.js?",
      Hard: "Design a rate-limited API gateway using Node.js."
    },
    "DevOps Engineer": {
      Easy: "What is CI/CD?",
      Medium: "How would you implement blue-green deployment?",
      Hard: "Design a highly available multi-region deployment strategy on cloud."
    },
    "Data Analyst": {
      Easy: "What is the difference between mean and median?",
      Medium: "How do you handle missing data in a dataset?",
      Hard: "How would you design an end-to-end KPI dashboard for business teams?"
    },
    "Data Scientist": {
      Easy: "What is overfitting in machine learning?",
      Medium: "Explain bias-variance tradeoff with an example.",
      Hard: "How would you design and evaluate a recommendation system at scale?"
    },
    "Machine Learning Engineer": {
      Easy: "What is the difference between training and inference?",
      Medium: "How do you monitor model drift in production?",
      Hard: "Design an MLOps pipeline for continuous training and deployment."
    },
    "QA Engineer": {
      Easy: "What is the difference between functional and non-functional testing?",
      Medium: "How do you decide what to automate in a regression suite?",
      Hard: "Design a testing strategy for a microservices-based application."
    },
    "Product Manager": {
      Easy: "What is a product roadmap?",
      Medium: "How do you prioritize features when resources are limited?",
      Hard: "How would you define and track success metrics for a new product launch?"
    }
  };

  return (
    questions[role]?.[difficulty] ||
    `Explain a ${difficulty} level concept in ${role}.`
  );
}