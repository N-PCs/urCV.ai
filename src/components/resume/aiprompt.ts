import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("Initializing Gemini AI...");

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("VITE_GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export const generateResponse = async (
  prompt: string,
  context: string = "",
): Promise<string> => {
  try {
    if (!apiKey) {
      return "I'm sorry, my API key is missing. Please check the settings.";
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Construct a comprehensive prompt with context
    const FullPrompt = context
      ? `Context: ${context}\n\nUser Question: ${prompt}\n\nPlease provide a helpful and professional response based on the context provided. Act as an expert resume builder and career counselor.`
      : `User Question: ${prompt}\n\nPlease provide a helpful and professional response. Act as an expert resume builder and career counselor.`;

    // Timeout helper
    const withTimeout = <T>(promise: PromiseLike<T>, timeoutMs: number, operationName: string): Promise<T> => {
      return Promise.race([
        Promise.resolve(promise),
        new Promise<T>((_, reject) =>
          setTimeout(() => reject(new Error(`${operationName} timed out after ${timeoutMs / 1000}s`)), timeoutMs)
        )
      ]);
    };

    const result: any = await withTimeout(
      model.generateContent(FullPrompt),
      15000,
      "Gemini generation"
    );
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    return "I'm having a little trouble connecting right now. Please try again in a moment.";
  }
};
