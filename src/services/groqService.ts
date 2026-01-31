import Groq from "groq-sdk";

// Initialize Groq with configuration
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || "",
  dangerouslyAllowBrowser: true,
  maxRetries: 3, // Retry failed requests up to 3 times
  timeout: 30000, // 30 second timeout
});

export interface ResumeAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
}

export interface EnhancedResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio?: string;
    summary: string;
    photoUrl?: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    languages: string[];
    certifications: string[];
  };
  hobbies?: string[];
  codingProfiles?: {
    github?: string;
    leetcode?: string;
    hackerrank?: string;
    codeforces?: string;
    kaggle?: string;
    codechef?: string;
  };
}

const cleanJsonResponse = (response: string): string => {
  let cleaned = response.trim();

  // Remove markdown code blocks
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  // Remove any remaining backticks
  cleaned = cleaned.replace(/^`+|`+$/g, "").trim();

  // Find the first { and last }
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  return cleaned;
};

export const analyzeResume = async (
  resumeData: any,
): Promise<ResumeAnalysis> => {
  try {
    if (!import.meta.env.VITE_GROQ_API_KEY) {
      throw new Error(
        "Groq API key is not configured. Please add VITE_GROQ_API_KEY to your environment variables.",
      );
    }

    const prompt = `Analyze this resume data and provide constructive feedback. Be specific and actionable.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Provide your analysis in this EXACT JSON format (no additional text, no markdown):
{
  "score": <number between 0-100>,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

Focus on:
1. Score: Rate the overall quality (0-100)
2. Strengths: What's working well (3-5 points)
3. Improvements: Areas that need work (3-5 points)
4. Suggestions: Specific actionable advice (3-5 points)`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume analyst. Provide feedback in valid JSON format only, with no markdown formatting or explanatory text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.5,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response received from AI");
    }

    console.log("Raw AI response:", response);

    try {
      const cleaned = cleanJsonResponse(response);
      console.log("Cleaned response:", cleaned);

      const parsed = JSON.parse(cleaned);

      // Validate the response structure
      if (
        typeof parsed.score !== "number" ||
        !Array.isArray(parsed.strengths) ||
        !Array.isArray(parsed.improvements) ||
        !Array.isArray(parsed.suggestions)
      ) {
        throw new Error("Invalid response structure");
      }

      return {
        score: Math.min(100, Math.max(0, parsed.score)),
        strengths: parsed.strengths.slice(0, 5),
        improvements: parsed.improvements.slice(0, 5),
        suggestions: parsed.suggestions.slice(0, 5),
      };
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      console.error("Failed response:", response);

      // Provide a fallback analysis based on basic checks
      return generateFallbackAnalysis(resumeData);
    }
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
};

const generateFallbackAnalysis = (resumeData: any): ResumeAnalysis => {
  const strengths: string[] = [];
  const improvements: string[] = [];
  const suggestions: string[] = [];
  let score = 50;

  // Analyze personal info
  if (resumeData.personalInfo?.fullName) {
    strengths.push("Contact information is present");
    score += 5;
  } else {
    improvements.push("Missing full name");
  }

  if (
    resumeData.personalInfo?.summary &&
    resumeData.personalInfo.summary.length > 50
  ) {
    strengths.push("Has a professional summary");
    score += 10;
  } else {
    improvements.push("Professional summary needs improvement");
    suggestions.push(
      "Add a compelling professional summary highlighting your key achievements",
    );
  }

  // Analyze experience
  if (resumeData.experience?.length > 0) {
    strengths.push(`${resumeData.experience.length} work experience entries`);
    score += 15;

    const hasDescriptions = resumeData.experience.some(
      (exp: any) => exp.description,
    );
    if (!hasDescriptions) {
      improvements.push("Experience descriptions are missing");
      suggestions.push(
        "Add detailed descriptions of your responsibilities and achievements",
      );
    }
  } else {
    improvements.push("No work experience listed");
    suggestions.push("Add your work experience with measurable achievements");
  }

  // Analyze education
  if (resumeData.education?.length > 0) {
    strengths.push("Education section is complete");
    score += 10;
  } else {
    improvements.push("Missing education information");
  }

  // Analyze skills
  if (resumeData.skills?.technical?.length > 0) {
    strengths.push(
      `${resumeData.skills.technical.length} technical skills listed`,
    );
    score += 10;
  } else {
    improvements.push("No technical skills listed");
    suggestions.push("Add relevant technical skills for your field");
  }

  // Ensure we have at least 3 of each
  while (suggestions.length < 3) {
    suggestions.push("Use action verbs to start bullet points");
    suggestions.push("Quantify achievements with numbers and percentages");
    suggestions.push(
      "Tailor your resume to the specific job you're applying for",
    );
  }

  return {
    score: Math.min(100, score),
    strengths: strengths.slice(0, 5),
    improvements: improvements.slice(0, 5),
    suggestions: suggestions.slice(0, 5),
  };
};

export const enhanceResume = async (
  resumeData: any,
): Promise<EnhancedResumeData> => {
  try {
    if (!import.meta.env.VITE_GROQ_API_KEY) {
      throw new Error(
        "Groq API key is not configured. Please add VITE_GROQ_API_KEY to your environment variables.",
      );
    }

    const prompt = `Enhance this resume to make it more professional and impactful. Improve the language, add impact statements, and make descriptions more compelling while keeping the same structure.

Current Resume:
${JSON.stringify(resumeData, null, 2)}

Return the enhanced resume in the EXACT same JSON structure. Focus on:
1. Making the professional summary more compelling
2. Adding impact to experience descriptions with action verbs
3. Improving the overall professional tone
4. Keeping all the original information but making it more powerful

Return ONLY valid JSON, no markdown or explanatory text.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume writer. Return enhanced resume data in valid JSON format only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // Upgraded for better enhancement quality
      temperature: 0.7,
      max_tokens: 3000, // Increased for longer resumes
      top_p: 0.9,
      frequency_penalty: 0.3,
      presence_penalty: 0.2,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response received from AI");
    }

    console.log("Enhancement response:", response);

    try {
      const cleaned = cleanJsonResponse(response);
      const enhanced = JSON.parse(cleaned);

      // Merge with original to ensure no data is lost
      return {
        ...resumeData,
        ...enhanced,
        personalInfo: {
          ...resumeData.personalInfo,
          ...enhanced.personalInfo,
        },
        skills: {
          ...resumeData.skills,
          ...enhanced.skills,
        },
      };
    } catch (parseError) {
      console.error("Failed to parse enhancement response:", parseError);
      // Return original if enhancement fails
      return resumeData;
    }
  } catch (error) {
    console.error("Error enhancing resume:", error);
    throw error;
  }
};

export const extractResumeDataWithAI = async (
  resumeText: string,
): Promise<EnhancedResumeData> => {
  try {
    if (!import.meta.env.VITE_GROQ_API_KEY) {
      throw new Error(
        "Groq API key is not configured. Please add VITE_GROQ_API_KEY to your environment variables.",
      );
    }

    const prompt = `Extract and structure information from this resume text into JSON format.

Resume Text:
${resumeText}

Extract the information into this EXACT JSON structure:
{
  "personalInfo": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "portfolio": "",
    "summary": "",
    "photoUrl": ""
  },
  "experience": [
    {
      "id": "exp-1",
      "title": "",
      "company": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "current": false,
      "description": ""
    }
  ],
  "education": [
    {
      "id": "edu-1",
      "degree": "",
      "school": "",
      "location": "",
      "graduationDate": "",
      "gpa": ""
    }
  ],
  "skills": {
    "technical": [],
    "languages": [],
    "certifications": []
  },
  "hobbies": [],
  "codingProfiles": {
    "github": "",
    "leetcode": "",
    "hackerrank": "",
    "codeforces": "",
    "kaggle": "",
    "codechef": ""
  }
}

Generate unique IDs for each experience and education entry. Return ONLY valid JSON, no markdown or explanatory text.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a resume data extraction expert. Return extracted data in valid JSON format only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // Better extraction accuracy
      temperature: 0.2, // Lower temperature for more accurate extraction
      max_tokens: 3000,
      top_p: 0.9,
      frequency_penalty: 0.1, // Minimal repetition for data extraction
      presence_penalty: 0.1,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response received from AI");
    }

    console.log("Extraction response:", response);

    const cleaned = cleanJsonResponse(response);
    const parsedData = JSON.parse(cleaned);

    // Ensure IDs exist
    if (parsedData.experience && Array.isArray(parsedData.experience)) {
      parsedData.experience = parsedData.experience.map(
        (exp: any, index: number) => ({
          ...exp,
          id: exp.id || `exp-${Date.now()}-${index}`,
        }),
      );
    }

    if (parsedData.education && Array.isArray(parsedData.education)) {
      parsedData.education = parsedData.education.map(
        (edu: any, index: number) => ({
          ...edu,
          id: edu.id || `edu-${Date.now()}-${index}`,
        }),
      );
    }

    return parsedData;
  } catch (error) {
    console.error("Error extracting resume data:", error);
    throw error;
  }
};

export const chatWithAI = async (
  message: string,
  context?: string,
): Promise<string> => {
  try {
    if (!import.meta.env.VITE_GROQ_API_KEY) {
      throw new Error(
        "Groq API key is not configured. Please add VITE_GROQ_API_KEY to your environment variables.",
      );
    }

    const systemMessage = context
      ? `You are a professional resume and career advisor AI assistant. Help users improve their resumes and advance their careers.\n\nContext about the user's resume:\n${context}`
      : "You are a professional resume and career advisor AI assistant. Help users with resume building, career advice, and job search tips. Be concise, helpful, and actionable.";

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile", // Best model for conversational responses
      temperature: 0.7,
      max_tokens: 800, // Increased for more detailed chat responses
      top_p: 0.9,
      frequency_penalty: 0.4, // Reduce repetitive responses
      presence_penalty: 0.3, // Encourage diverse conversation
      stream: false, // Set to true if you want streaming responses
    });

    return (
      completion.choices[0]?.message?.content ||
      "I apologize, but I could not process your request. Please try again."
    );
  } catch (error) {
    console.error("Error in chat:", error);
    throw error;
  }
};
