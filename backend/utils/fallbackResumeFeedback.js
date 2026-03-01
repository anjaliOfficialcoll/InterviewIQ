export function getFallbackResumeFeedback(fileName = "resume.pdf") {
  return `Score: 6/10
Suggested Role: Full Stack Developer
Suggested Difficulty: Medium
Strengths:
- Resume file was received successfully (${fileName})
- Good initiative to prepare before interviews
Improvements:
- Add quantified impact in project/work bullet points
- Highlight core skills at the top (tech stack + strongest domain)
Focus Topics:
- Data structures and problem solving explanations
- System design basics and trade-off communication
Summary:
Your resume was uploaded, but AI analysis is temporarily unavailable.
You can still continue interview practice with a strong medium-level track.`;
}
