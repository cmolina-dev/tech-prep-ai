import OpenAI from 'openai';

// Initialize OpenAI client pointing to Local LM Studio
export const aiClient = new OpenAI({
  baseURL: 'http://localhost:1234/v1',
  apiKey: 'lm-studio', // Not used but required by SDK
  dangerouslyAllowBrowser: true // Setting this to true just in case, but usually used server-side
});

export async function generateFeedback(question: string, userAnswer: string) {
    const response = await aiClient.chat.completions.create({
        model: "local-model", // LM Studio ignores this, but required
        messages: [
            { role: "system", content: "You are an expert technical interviewer. Evaluate the user's answer. Provide a JSON response with: score (0-100), feedback (concise critique), and a better_answer (model answer)." },
            { role: "user", content: `Question: ${question}\nUser Answer: ${userAnswer}` }
        ],
        response_format: { type: "json_object" }
    });
    
    return JSON.parse(response.choices[0].message.content || "{}");
}
