import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResultData } from "../types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateBirthdayBlessing = async (result: ResultData): Promise<string> => {
    const prompt = `
        妳是一個貼心的戀愛小助手。我的女朋友生日快到了，她剛做完一個心理測驗，結果顯示她最適合『${result.fullTitle}』。
        請根據這個行程風格（${result.desc}），寫一段大約 60-80 字的溫暖、幽默又浪漫的生日祝福給她。
        告訴她為什麼她今天的狀態（例如想放鬆、或想看展）非常值得這趟旅程。
        語氣要像男朋友對女朋友說話，請用繁體中文。不要有標題，直接寫內容。
    `;

    try {
        const response = await model.generateContent(prompt);
        const result = await response.response;
        return result.text() || null;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return null;
    }
};
