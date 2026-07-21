import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY || '';

const MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createClient(model: string, systemInstruction?: string) {
  return new GoogleGenerativeAI(API_KEY).getGenerativeModel({ model, systemInstruction });
}

export const generateContent = async (prompt: string, systemInstruction?: string) => {
  if (!API_KEY) {
    throw new Error('GEMINI_API_KEY tidak dikonfigurasi.');
  }

  let lastError: unknown;

  for (const model of MODELS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const genAI = createClient(model, systemInstruction);
        const result = await genAI.generateContent(prompt);
        return result.response.text();
      } catch (err: unknown) {
        lastError = err;
        const msg = String(err);

        if (msg.includes('429') || msg.includes('quota') || msg.includes('Quota') || msg.includes('RATE_LIMIT')) {
          const wait = Math.min(1000 * Math.pow(2, attempt), 8000);
          console.warn(`[Gemini] ${model} rate limited, retry in ${wait}ms`);
          await sleep(wait);
          continue;
        }

        if (msg.includes('not found') || msg.includes('not supported') || msg.includes('404')) {
          console.warn(`[Gemini] Model ${model} unavailable, trying next`);
          break;
        }

        throw err;
      }
    }
  }

  throw lastError || new Error('Semua model Gemini gagal.');
};
