import { Router } from 'express';
import type { Request, Response } from 'express';
import { generateContent } from '../lib/gemini.js';

const router = Router();

router.post('/reply', async (req: Request, res: Response) => {
  try {
    const { message, tone } = req.body;
    const prompt = `Pesan pelanggan: "${message}"\nTone balasan yang diinginkan: ${tone}`;
    const sysInst = "Kamu adalah Customer Service handal untuk sebuah kedai kopi. Berikan SATU balasan yang profesional, sopan, dan sesuai dengan tone yang diminta. Gunakan sapaan yang hangat seperti 'Kak'. Sertakan emoji yang natural. Jangan membuat janji diskon yang tidak disebutkan. Balasan harus siap kirim langsung ke pelanggan.";

    const data = await generateContent(prompt, sysInst);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: 'Gagal menghasilkan balasan.', error: String(error) });
  }
});

export default router;
