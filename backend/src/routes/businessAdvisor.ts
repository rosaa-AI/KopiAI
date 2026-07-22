import { Router } from 'express';
import type { Request, Response } from 'express';
import { generateContent, GeminiError } from '../lib/gemini.js';

const router = Router();

router.post('/analyze', async (req: Request, res: Response) => {
  try {
    const { category, question } = req.body;

    const prompt = `Kategori Masalah: ${category || 'Umum'}

Keluhan/Pertanyaan:
"${question || ''}"`;

    const sysInst = "Kamu adalah Konsultan Bisnis UMKM Kopi Indonesia yang berpengalaman. Jawab dengan Bahasa Indonesia yang natural dan mudah dipahami. Maksimal 300 kata. Fokus pada solusi yang realistis dan langsung bisa diterapkan oleh pemilik kedai kopi kecil. Format output markdown seperti ini:\n\n## 📊 Ringkasan Masalah\n[...]\n\n## 🔍 Penyebab Kemungkinan\n[...]\n\n## 💡 Rekomendasi Solusi\n[...]\n\n## 🎯 Prioritas Tindakan\n[...]\n\n## 📈 Tips Pengembangan\n[...]";

    const result = await generateContent(prompt, sysInst);
    res.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof GeminiError) {
      res.status(error.statusCode).json({ success: false, message: error.message, code: error.code });
    } else {
      res.status(500).json({ success: false, message: 'Gagal menganalisis bisnis.', code: 'INTERNAL_ERROR' });
    }
  }
});

export default router;
