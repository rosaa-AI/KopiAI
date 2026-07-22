import { Router } from 'express';
import type { Request, Response } from 'express';
import { generateContent, GeminiError } from '../lib/gemini.js';

const router = Router();

router.post('/translate', async (req: Request, res: Response) => {
  try {
    const { text, language } = req.body;
    const prompt = `Terjemahkan teks berikut ke bahasa ${language}:\n\n${text}`;
    const sysInst = 'Kamu adalah translator profesional. Terjemahkan dengan akurat dan alami. Pertahankan format dan nada bicara asli.';

    const data = await generateContent(prompt, sysInst);
    res.json({ success: true, data });
  } catch (error) {
    if (error instanceof GeminiError) {
      res.status(error.statusCode).json({ success: false, message: error.message, code: error.code });
    } else {
      res.status(500).json({ success: false, message: 'Gagal menerjemahkan teks.', code: 'INTERNAL_ERROR' });
    }
  }
});

export default router;
