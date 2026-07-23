import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from 'process';

const RAW_KEY = env.GEMINI_API_KEY || '';
const API_KEY = RAW_KEY.trim();

function logKeyPreview(label: string, key: string) {
  if (!key) {
    console.error(`[Gemini-Key] ${label}: KEY KOSONG`);
    return;
  }
  console.error(`[Gemini-Key] ${label} length: ${key.length}`);
  console.error(`[Gemini-Key] ${label} starts with: ${key.slice(0, 6)}`);
  console.error(`[Gemini-Key] ${label} ends with: ...${key.slice(-4)}`);
  console.error(`[Gemini-Key] ${label} trimmed match: ${key === key.trim()}`);
  const validPrefixes = ['AIzaSy', 'AIza', 'sk-'];
  const matched = validPrefixes.some(p => key.startsWith(p));
  console.error(`[Gemini-Key] ${label} valid prefix: ${matched}`);
  if (!matched) {
    console.error(`[Gemini-Key] ${label} WARNING: does not start with expected Gemini API key prefix (AIzaSy...). Possible causes:`);
    console.error(`  - Key is from Google Cloud service account (JSON) instead of Gemini API key`);
    console.error(`  - Key contains whitespace or invisible characters`);
    console.error(`  - Key is an OAuth token instead of an API key`);
    console.error(`  - Key was truncated or copied incorrectly`);
  }
}

logKeyPreview('GEMINI_API_KEY', API_KEY);

const MODELS = [
  'gemini-2.5-flash'
];

const MAX_RETRIES = 1;
const BASE_DELAY = 1000;
const MAX_DELAY = 4000;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let genAI: GoogleGenerativeAI | null = null;

function getClient() {
  if (!genAI) genAI = new GoogleGenerativeAI(API_KEY);
  return genAI;
}

function isRateLimitError(err: unknown): boolean {
  const msg = String(err);
  if (msg.includes('429') || msg.includes('quota') || msg.includes('Quota') || msg.includes('RATE_LIMIT') || msg.includes('RESOURCE_EXHAUSTED')) {
    return true;
  }
  if (typeof err === 'object' && err !== null) {
    const e = err as Record<string, unknown>;
    if (e.status === 429 || e.code === 429) return true;
    if (e.response && typeof e.response === 'object') {
      const resp = e.response as Record<string, unknown>;
      if (resp.status === 429) return true;
    }
  }
  return false;
}

function isModelNotFoundError(err: unknown): boolean {
  const msg = String(err);
  if (msg.includes('not found') || msg.includes('not supported') || msg.includes('404') || msg.includes('model_not_found')) {
    return true;
  }
  if (typeof err === 'object' && err !== null) {
    const e = err as Record<string, unknown>;
    if (e.status === 404) return true;
    if (e.response && typeof e.response === 'object') {
      const resp = e.response as Record<string, unknown>;
      if (resp.status === 404) return true;
    }
  }
  return false;
}

export class GeminiError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.name = 'GeminiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

export const generateContent = async (prompt: string, systemInstruction?: string) => {
  if (!API_KEY) {
    throw new GeminiError('GEMINI_API_KEY tidak dikonfigurasi.', 503, 'CONFIG_ERROR');
  }
  logKeyPreview('runtime GEMINI_API_KEY', API_KEY);

  let lastError: unknown;
  let wasRateLimited = false;

  for (const model of MODELS) {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const ai = getClient().getGenerativeModel({ model, systemInstruction });
        const result = await ai.generateContent(prompt);
        return result.response.text();
      } catch (err: unknown) {
        lastError = err;

        console.error(`[Gemini] Full error object for model ${model} (attempt ${attempt}):`);
        console.error(`  message:`, err instanceof Error ? err.message : String(err));
        if (typeof err === 'object' && err !== null) {
          const e = err as Record<string, unknown>;
          console.error(`  status:`, e.status);
          console.error(`  code:`, e.code);
          console.error(`  details:`, e.details);
          console.error(`  response:`, e.response);
          console.dir(err, { depth: null });
        }

        if (isRateLimitError(err)) {
          wasRateLimited = true;
          if (attempt < MAX_RETRIES) {
            const wait = Math.min(BASE_DELAY * Math.pow(2, attempt), MAX_DELAY);
            console.warn(`[Gemini] ${model} rate limited, retry in ${wait}ms`);
            await sleep(wait);
            continue;
          }
          console.warn(`[Gemini] ${model} exhausted retries, falling back to next model`);
          break;
        }

        if (isModelNotFoundError(err)) {
          console.warn(`[Gemini] Model ${model} unavailable, trying next`);
          break;
        }

        throw err;
      }
    }
  }

  if (wasRateLimited) {
    throw new GeminiError('AI service is currently busy. Please try again later.', 429, 'RATE_LIMITED');
  }
  throw new GeminiError('AI service is currently unavailable. Please try again later.', 503, 'SERVICE_UNAVAILABLE');
};
