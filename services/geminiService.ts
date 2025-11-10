import { GoogleGenAI, Type } from "@google/genai";
import { PostAnalysis } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzePost = async (postContent: string): Promise<PostAnalysis> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an AI assistant that analyzes social media posts. Your task is to determine if a post is relevant to our expertise in tech, coding, or design errors.
Analyze the following post content and respond with a JSON object matching the provided schema.

Post content:
"${postContent}"

The JSON object should indicate if the post is relevant. If it is, provide a short topic and a concise summary of the user's problem or question. If not, mark it as not relevant.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        isRelevant: {
                            type: Type.BOOLEAN,
                            description: "Whether the post is relevant to tech, coding, or design errors."
                        },
                        topic: {
                            type: Type.STRING,
                            description: "A short topic of the post if relevant (e.g., 'JavaScript function error'). 'N/A' if not relevant."
                        },
                        summary: {
                            type: Type.STRING,
                            description: "A concise summary of the user's problem. 'N/A' if not relevant."
                        },
                    },
                    required: ["isRelevant", "topic", "summary"]
                },
            },
        });

        const jsonString = response.text.trim();
        const analysisResult: PostAnalysis = JSON.parse(jsonString);
        return analysisResult;
    } catch (error) {
        console.error("Error analyzing post:", error);
        throw new Error("Failed to analyze the post. Please try again.");
    }
};

export const generateComment = async (postSummary: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an AI assistant that helps users on social media with tech, coding, and design problems.
Based on the following summary of a user's post, write a short, precise, human-like, and helpful comment.

Rules:
- Address the specific issue mentioned.
- Avoid long explanations.
- Maintain a helpful and slightly empathetic tone.
- Start the comment directly without any preamble like "It looks like..." or "I see that...".
- Get straight to the point. For example, instead of "It seems like you should...", say "Your function is missing...".

Post Summary:
"${postSummary}"`,
            config: {
                temperature: 0.8,
            }
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error generating comment:", error);
        throw new Error("Failed to generate a comment. Please try again.");
    }
};