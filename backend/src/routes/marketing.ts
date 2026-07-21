import { Router } from 'express';
import type { Request, Response } from 'express';
import multer from 'multer';
import { generateContent } from '../lib/gemini.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/generate', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { productName, targetMarket, promo } = req.body;
    const file = req.file;

    let imageContext = '';
    if (file) {
      const b64 = file.buffer.toString('base64');
      imageContext = `\n\n[Gambar produk tersedia (base64): data:${file.mimetype};base64,${b64}]`;
    }

    const prompt = `Buatkan konten marketing untuk:
      Produk: ${productName || 'Produk Kopi'}
      Target Pasar: ${targetMarket || 'UMKM'}
      Promo/Info: ${promo || ''}${imageContext}`;
    const sysInst = "Kamu adalah Digital Marketing Expert khusus kedai kopi UMKM. Buat 1 caption Instagram yang engaging, 1 ide video TikTok, dan 5-10 hashtag relevan. Gunakan gaya bahasa yang menarik pelanggan, sertakan emoji. Format output menggunakan Markdown.";

    const data = await generateContent(prompt, sysInst);
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: 'Gagal menghasilkan konten marketing.', error: String(error) });
  }
});

export default router;
