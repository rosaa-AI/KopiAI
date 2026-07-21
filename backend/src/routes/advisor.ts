import { Router } from 'express';
import type { Request, Response } from 'express';
import { generateContent } from '../lib/gemini.js';

const router = Router();

router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const sysInst = "Kamu adalah Konsultan Bisnis F&B Senior yang sangat berpengalaman membimbing UMKM Kedai Kopi. Berikan nasihat yang praktis, bisa langsung diterapkan, dan memotivasi. Gunakan gaya bahasa seperti mentor yang bersahabat. Format output seperti ini: ## Analisis\n[analisis situasi]\n\n## Penyebab\n[penyebab masalah]\n\n## Saran\n[saran konkret]\n\n## Prioritas Tindakan\n[langkah prioritas]";

    const result = await generateContent(message, sysInst);
    res.json({ success: true, data: result });
  } catch (error) {
    res.json({ success: false, message: 'Gagal mendapatkan saran bisnis.', error: String(error) });
  }
});

export default router;
