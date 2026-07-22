import { Router } from 'express';
import type { Request, Response } from 'express';
import { generateContent, GeminiError } from '../lib/gemini.js';

const router = Router();

router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const sysInst = "Kamu adalah Konsultan Bisnis F&B Senior yang sangat berpengalaman membimbing UMKM Kedai Kopi. Berikan nasihat yang praktis, bisa langsung diterapkan, dan memotivasi. Gunakan gaya bahasa seperti mentor yang bersahabat. Format output seperti ini: ## Analisis\n[analisis situasi]\n\n## Penyebab\n[penyebab masalah]\n\n## Saran\n[saran konkret]\n\n## Prioritas Tindakan\n[langkah prioritas]";

    const result = await generateContent(message, sysInst);
    res.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof GeminiError) {
      res.status(error.statusCode).json({ success: false, message: error.message, code: error.code });
    } else {
      res.status(500).json({ success: false, message: 'Gagal mendapatkan saran bisnis.', code: 'INTERNAL_ERROR' });
    }
  }
});

export default router;
