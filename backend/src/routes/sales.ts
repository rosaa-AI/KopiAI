import { Router } from 'express';
import type { Request, Response } from 'express';
import multer from 'multer';
import { generateContent, GeminiError } from '../lib/gemini.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/analyze', upload.single('file'), async (req: Request, res: Response) => {
  try {
    let rawData = req.body.data || '';
    const file = req.file;

    if (file) {
      const csvText = file.buffer.toString('utf-8');
      rawData = rawData ? `${rawData}\n\n--- CSV Content ---\n${csvText}` : csvText;
    }

    const prompt = `Berikut adalah data penjualan kasarku:\n\n${rawData || 'Tidak ada data'}`;
    const sysInst = "Kamu adalah Business Analyst untuk UMKM Kopi. Analisis data penjualan yang diberikan. Berikan insight berupa: 1. Produk terlaris & kurang laku, 2. Analisis waktu ramai (jika ada data waktu), 3. Tiga rekomendasi strategi konkret untuk menaikkan omset besok. Gunakan Markdown yang rapi dan mudah dibaca orang awam.";

    const result = await generateContent(prompt, sysInst);
    res.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof GeminiError) {
      res.status(error.statusCode).json({ success: false, message: error.message, code: error.code });
    } else {
      res.status(500).json({ success: false, message: 'Gagal menganalisis data penjualan.', code: 'INTERNAL_ERROR' });
    }
  }
});

export default router;
