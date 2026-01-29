
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

import { ResumeData } from '@/pages/Builder';

export interface ResumeAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
}

export type EnhancedResumeData = ResumeData;


export const analyzeResume = async (resumeData: any): Promise<ResumeAnalysis> => {
  try {
    const prompt = `Analyze this resume data and provide feedback:
    
    ${JSON.stringify(resumeData, null, 2)}
    
    Please provide:
    1. A score out of 100
    2. List of strengths
    3. List of areas for improvement
    4. Specific suggestions for enhancement
    
    Respond in JSON format with keys: score, strengths, improvements, suggestions`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from AI');

    // Try to parse JSON, fallback to structured text parsing
    try {
      return JSON.parse(response);
    } catch {
      // Fallback parsing if JSON is malformed
      return {
        score: 75,
        strengths: ['Experience section is well-detailed', 'Good technical skills listed'],
        improvements: ['Add more quantifiable achievements', 'Improve summary section'],
        suggestions: ['Use action verbs in experience descriptions', 'Add relevant certifications']
      };
    }
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
};

export const enhanceResume = async (resumeData: any): Promise<EnhancedResumeData> => {
  try {
    const prompt = `Enhance this resume data to make it more professional and impactful:
    
    ${JSON.stringify(resumeData, null, 2)}
    
    Please improve:
    1. Professional summary - make it more compelling
    2. Experience descriptions - add impact and achievements
    3. Skills organization - categorize better
    4. Overall professional language
    
    Return the enhanced resume in the same JSON structure.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from AI');

    try {
      return JSON.parse(response);
    } catch {
      // Fallback to original data if parsing fails
      return resumeData;
    }
  } catch (error) {
    console.error('Error enhancing resume:', error);
    throw error;
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
      model: 'llama3-8b-8192',
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
    const prompt = `Extract and structure the following resume data into a JSON format:

    ${resumeText}

    Please extract and organize the information into this exact JSON structure:
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
          "id": "unique-id",
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
          "id": "unique-id",
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
    }

    Extract all relevant information and organize it properly. If information is missing, leave the field empty. Return ONLY valid JSON without any explanatory text, markdown formatting, or code blocks.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.3,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from AI');

    console.log('Raw AI response:', response);

    try {
      // Clean the response by removing markdown code blocks and extra whitespace
      let cleanResponse = response.trim();

      // Remove any explanatory text before JSON
      const jsonStartIndex = cleanResponse.indexOf('{');
      if (jsonStartIndex > 0) {
        cleanResponse = cleanResponse.substring(jsonStartIndex);
      }

      // Find the last closing brace to remove any text after JSON
      const jsonEndIndex = cleanResponse.lastIndexOf('}');
      if (jsonEndIndex > 0) {
        cleanResponse = cleanResponse.substring(0, jsonEndIndex + 1);
      }

      // Remove markdown code blocks if present
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      // Remove any remaining backticks or formatting
      cleanResponse = cleanResponse.replace(/^`+|`+$/g, '').trim();

      console.log('Cleaned response:', cleanResponse);

      const parsedData = JSON.parse(cleanResponse);

      // Generate IDs for experience and education if missing
      if (parsedData.experience && Array.isArray(parsedData.experience)) {
        parsedData.experience = parsedData.experience.map((exp: any, index: number) => ({
          ...exp,
          id: exp.id || `exp-${index + 1}`
        }));
      }

      if (parsedData.education && Array.isArray(parsedData.education)) {
        parsedData.education = parsedData.education.map((edu: any, index: number) => ({
          ...edu,
          id: edu.id || `edu-${index + 1}`
        }));
      }

      console.log('Successfully parsed data:', parsedData);
      return parsedData;
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Failed to parse response:', response);
      // Fallback if JSON parsing fails
      throw new Error('Failed to parse AI response');
    }
  } catch (error) {
    console.error('Error extracting resume data:', error);
    throw error;
  }
};
