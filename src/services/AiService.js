import OpenAI from "openai";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const openai = new OpenAI({
  apiKey: API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

const draftPrompt = (technology, experience) => {
  return `Generate 10 interview questions for ${experience} level candidates in ${technology}. 
Provide the questions in a JSON array format as a list of strings.
Do not add any extra text or markdown formatting.
Return ONLY valid JSON array, nothing else.
Example format: ["Question 1?", "Question 2?", "Question 3?"]`;
};

async function generateQuestions(technology, experience) {
  try {
    if (!technology.trim()) {
      throw new Error("Technology field is required");
    }

    const prompt = draftPrompt(technology, experience);
    console.log("Sending prompt to Groq API...");

    const response = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1024,
    });

    console.log("Response from Groq:", response);

    if (
      !response.choices ||
      !response.choices[0] ||
      !response.choices[0].message
    ) {
      throw new Error("Invalid response format from API");
    }

    const data = response.choices[0].message.content.trim();

    // Validate JSON response
    try {
      JSON.parse(data);
    } catch (parseError) {
      throw new Error(
        `Invalid JSON response from API: ${data.substring(0, 100)}...`,
      );
    }

    return data;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
}

export default generateQuestions;
