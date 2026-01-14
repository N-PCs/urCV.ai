
import Groq from 'groq-sdk';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!apiKey || apiKey === 'YOUR_GROQ_API_KEY') {
  console.warn('Groq API key is missing. Please set VITE_GROQ_API_KEY in your .env file.');
}

const groq = new Groq({
  apiKey: apiKey || '',
  dangerouslyAllowBrowser: true
});

/**
 * Cleans the AI response by removing markdown formatting and isolating JSON.
 */
const cleanAIResponse = (response: string): string => {
  let cleanResponse = response.trim();
  
  // Find the first '{' and last '}' to isolate JSON object
  const jsonStartIndex = cleanResponse.indexOf('{');
  const jsonEndIndex = cleanResponse.lastIndexOf('}');
  
  if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
    cleanResponse = cleanResponse.substring(jsonStartIndex, jsonEndIndex + 1);
  }
  
  // Remove markdown code blocks if still present
  cleanResponse = cleanResponse
    .replace(/^```json\s*/, '')
    .replace(/^```\s*/, '')
    .replace(/\s*```$/, '')
    .replace(/^`+|`+$/g, '')
    .trim();
    
  return cleanResponse;
};

/**
 * Handles Groq API errors and provides user-friendly messages.
 */
const handleGroqError = (error: any, context: string): never => {
  console.error(`Error in ${context}:`, error);
  
  if (error.status === 401) {
    throw new Error('Invalid Groq API key. Please check your configuration.');
  } else if (error.status === 429) {
    throw new Error('AI rate limit reached. Please wait a moment and try again.');
  } else if (error.status === 413) {
    throw new Error('Resume text is too large for the AI to process.');
  } else if (error.message?.includes('JSON.parse')) {
    throw new Error('AI response was malformed. Please try again.');
  }
  
  throw new Error(error.message || `Failed to ${context}. Please check your connection.`);
};

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
    summary: string;
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
}

export const analyzeResume = async (resumeData: any): Promise<ResumeAnalysis> => {
  try {
    // Robust validation to see if the resume is actually empty
    const hasPersonalInfo = resumeData.personalInfo && 
                           typeof resumeData.personalInfo === 'object' &&
                           resumeData.personalInfo.fullName && 
                           resumeData.personalInfo.fullName.trim().length > 0;
                           
    const hasExperience = Array.isArray(resumeData.experience) && 
                          resumeData.experience.length > 0 &&
                          resumeData.experience[0].title;
                          
    const hasEducation = Array.isArray(resumeData.education) && 
                         resumeData.education.length > 0 &&
                         resumeData.education[0].school;
                         
    const hasSkills = resumeData.skills && 
                       ((Array.isArray(resumeData.skills.technical) && resumeData.skills.technical.length > 0) ||
                        (Array.isArray(resumeData.skills.languages) && resumeData.skills.languages.length > 0) ||
                        (Array.isArray(resumeData.skills.certifications) && resumeData.skills.certifications.length > 0));
  
     if (!hasPersonalInfo && !hasExperience && !hasEducation && !hasSkills) {
       console.log('Resume validation failed. Data:', JSON.stringify(resumeData));
       return {
         score: 0,
         strengths: [],
         improvements: ['Your resume appears to be empty. Please fill in your details or upload a resume.'],
         suggestions: ['Start by adding your personal information', 'Add your work experience and education']
       };
     }

    console.log('Analyzing resume data:', JSON.stringify(resumeData, null, 2));

    const prompt = `You are an expert ATS (Applicant Tracking System) and professional resume reviewer. 
    Analyze the following resume data and provide a detailed, honest, and constructive evaluation.
    
    CRITICAL INSTRUCTIONS:
    1. If the "RESUME DATA TO ANALYZE" contains ANY real information (like a name, a job title, or a skill), you MUST give a score between 1 and 100.
    2. A score of 0 is ONLY allowed if the entire "RESUME DATA TO ANALYZE" is empty, null, or contains only placeholder/template data that doesn't belong to a person.
    3. Even if the resume is very poor, if it has content, give it at least a score of 10-20.
    
    RESUME DATA TO ANALYZE:
    ${JSON.stringify(resumeData, null, 2)}
    
    Please provide:
    1. A numerical score (1-100) based on professional standards, clarity, and ATS-friendliness.
    2. A list of 3-5 specific strengths found in this data.
    3. A list of 3-5 specific areas for improvement.
    4. A list of 3-5 actionable suggestions to make the resume stand out.
    
    Respond ONLY with a valid JSON object in this format:
    {
      "score": number,
      "strengths": ["string", ...],
      "improvements": ["string", ...],
      "suggestions": ["string", ...]
    }`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a professional career coach and resume expert. You only output valid JSON.' },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from AI');

    try {
      const cleanResponse = cleanAIResponse(response);
      return JSON.parse(cleanResponse);
    } catch (parseError) {
      console.warn('JSON parsing failed, using fallback analysis:', parseError);
      return {
        score: 70,
        strengths: ['Clear structure', 'Relevant sections included'],
        improvements: ['Could use more quantifiable metrics', 'Summary could be more impactful'],
        suggestions: ['Add specific numbers to your achievements', 'Tailor your summary to target roles']
      };
    }
  } catch (error) {
    return handleGroqError(error, 'analyze resume');
  }
};

export const enhanceResume = async (resumeData: any): Promise<EnhancedResumeData> => {
  try {
    const prompt = `You are a professional resume writer and career expert. 
    Your task is to rewrite and enhance the following resume data to make it significantly more professional, impactful, and ATS-optimized.
    
    ${JSON.stringify(resumeData, null, 2)}
    
    Focus on:
    1. Rewriting the summary to be a compelling "Elevator Pitch".
    2. Using strong action verbs and quantifiable results in the experience section.
    3. Improving the overall professional tone and vocabulary.
    4. Ensuring all data is preserved but presented more effectively.
    
    Return the FULL enhanced resume data in the exact same JSON structure. Respond ONLY with the JSON object.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are an expert resume writer. You only output valid JSON.' },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.4,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from AI');

    try {
      const cleanResponse = cleanAIResponse(response);
      return JSON.parse(cleanResponse);
    } catch {
      return resumeData; // Fallback to original if enhancement fails
    }
  } catch (error) {
    return handleGroqError(error, 'enhance resume');
  }
};

export const chatWithAI = async (message: string, context?: string): Promise<string> => {
  try {
    const systemMessage = context 
      ? `You are a professional resume and career advisor AI assistant. Context: ${context}`
      : 'You are a professional resume and career advisor AI assistant. Help users with resume building, career advice, and job search tips.';

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: message }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not process your request.';
  } catch (error) {
    console.error('Error in chat:', error);
    throw error;
  }
};

export const extractResumeDataWithAI = async (resumeText: string): Promise<EnhancedResumeData> => {
  try {
    console.log('Extracting resume data from text (length):', resumeText.length);
    
    if (!resumeText || resumeText.trim().length < 50) {
      throw new Error('The provided text is too short to be a valid resume. Please provide more detail.');
    }

    const prompt = `You are an expert resume parser. Your task is to extract all professional information from the text below and structure it into a clean JSON format.

    TEXT TO PARSE:
    """
    ${resumeText}
    """

    STRICT RULES:
    1. Extract the full name, email, phone, location, and LinkedIn URL if present.
    2. For Experience and Education, extract ALL items found.
    3. For "current" in experience, set to true if the end date is "Present", "Current", or if no end date is provided for the first item.
    4. If a specific field is absolutely not found, use an empty string "" or an empty array [].
    5. Ensure the "id" fields are unique (e.g., "exp-1", "exp-2").
    6. Return ONLY the JSON object. No markdown, no "Here is the JSON", no conversational filler.

    JSON STRUCTURE TO FOLLOW:
    {
      "personalInfo": {
        "fullName": "",
        "email": "",
        "phone": "",
        "location": "",
        "linkedin": "",
        "summary": ""
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
      }
    }`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a data extraction expert. You only output valid JSON.' },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from AI');

    try {
      const cleanResponse = cleanAIResponse(response);
      const parsedData = JSON.parse(cleanResponse);
      console.log('Extracted data from AI:', parsedData);
      
      // Post-process to ensure IDs and types
      if (parsedData.experience) {
        parsedData.experience = parsedData.experience.map((exp: any, i: number) => ({
          ...exp,
          id: exp.id || `exp-${i + 1}`
        }));
      }
      if (parsedData.education) {
        parsedData.education = parsedData.education.map((edu: any, i: number) => ({
          ...edu,
          id: edu.id || `edu-${i + 1}`
        }));
      }
      
      return parsedData;
    } catch (parseError) {
      console.error('Failed to parse extraction result:', response);
      return handleGroqError(parseError, 'extract resume data');
    }
  } catch (error) {
    return handleGroqError(error, 'extract resume data');
  }
};
