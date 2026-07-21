import { Router } from 'express';
import type { Request, Response } from 'express';
import { generateContent } from '../lib/gemini.js';

const router = Router();

router.post('/translate', async (req: Request, res: Response) => {
  try {
    const { text, language } = req.body;
    const prompt = `Terjemahkan teks berikut ke bahasa ${language}:\n\n${text}`;
    const sysInst = 'Kamu adalah translator profesional. Terjemahkan dengan akurat dan alami. Pertahankan format dan nada bicara asli.';

    const data = await generateContent(prompt, sysInst);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: 'Gagal menerjemahkan teks.', error: String(error) });
  }
});

export default router;
