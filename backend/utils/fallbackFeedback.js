export function getFallbackFeedback(question, answer) {
  // Basic validation of answer quality
  const answerLength = answer.trim().length;
  const hasStructure = answer.includes(".") && answer.length > 20;
  const letterCount = answer.match(/[a-zA-Z]/g)?.length || 0;

  let score = 5; // Default score
  let strengths = [];
  let improvements = [];

  // Score based on answer characteristics
  if (answerLength < 50) {
    score = 4;
    improvements.push("Your answer is too brief. Elaborate more on the concept.");
  } else if (answerLength < 150) {
    score = 6;
    strengths.push("You provided a basic explanation.");
  } else if (answerLength < 300) {
    score = 7;
    strengths.push("Good detailed explanation with reasonable depth.");
  } else {
    score = 8;
    strengths.push("Comprehensive answer with detailed explanation.");
  }

  if (hasStructure) {
    strengths.push("Your answer is well-structured with clear points.");
  } else {
    improvements.push("Try to structure your answer with clear, distinct points.");
  }

  if (letterCount < 50) {
    improvements.push("Add more technical details or examples to strengthen your answer.");
  }

  // Default missing concepts
  if (!improvements.length) {
    improvements.push("Consider adding real-world examples or use cases.");
    improvements.push("Explore edge cases or potential challenges.");
  }

  const feedback = `
AI Evaluation (Fallback Mode - Will be enhanced when service is available)

Score: ${score}/10

✅ Strengths:
${strengths.map(s => `• ${s}`).join("\n")}

🔍 Areas for Improvement:
${improvements.map(i => `• ${i}`).join("\n")}

💡 General Tips:
• Provide specific examples when possible
• Explain the "why" not just the "what"
• Consider edge cases and potential challenges
• Use technical terminology confidently

📝 Model Answer Framework:
Start by defining the core concept, explain the mechanism or process, provide an example, then discuss real-world applications.
  `;

  return feedback.trim();
}
