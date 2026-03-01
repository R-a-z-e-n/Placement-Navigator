import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const geminiModel = "gemini-3-flash-preview";

export async function getResumeScore(resumeText: string) {
  const response = await ai.models.generateContent({
    model: geminiModel,
    contents: `Analyze this resume and provide a score out of 100, along with strengths and areas for improvement. Resume text: ${resumeText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          improvements: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["score", "feedback", "strengths", "improvements"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
}

export async function getInterviewQuestion(history: { role: string, text: string }[], jobRole: string) {
  const response = await ai.models.generateContent({
    model: geminiModel,
    contents: {
      parts: [
        { text: `You are an expert interviewer for a ${jobRole} position. Ask one challenging technical or behavioral question based on the conversation history. If it's the start, introduce yourself and ask the first question.` },
        ...history.map(h => ({ text: `${h.role}: ${h.text}` }))
      ]
    }
  });
  return response.text;
}

export async function getInterviewFeedback(history: { role: string, text: string }[]) {
  const response = await ai.models.generateContent({
    model: geminiModel,
    contents: `Analyze this interview transcript and provide feedback on performance, communication, and technical depth. Transcript: ${JSON.stringify(history)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallScore: { type: Type.NUMBER },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          tips: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["overallScore", "strengths", "weaknesses", "tips"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
}

export async function getCompanyInsights(companyName: string) {
  const response = await ai.models.generateContent({
    model: geminiModel,
    contents: `Provide detailed recruiter insights, typical interview process, and company culture for ${companyName}. Include key skills they look for.`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  return response.text;
}

export async function generateResumeSummary(role: string, experience: string) {
  const response = await ai.models.generateContent({
    model: geminiModel,
    contents: `Generate a professional 2-3 sentence resume summary for a ${role} with the following experience: ${experience}. Make it impactful and tailored for recruitment.`,
  });
  return response.text;
}

export async function improveBulletPoint(text: string) {
  const response = await ai.models.generateContent({
    model: geminiModel,
    contents: `Rewrite this resume bullet point to be more professional, action-oriented, and quantifiable if possible: "${text}". Provide only the rewritten text.`,
  });
  return response.text;
}
