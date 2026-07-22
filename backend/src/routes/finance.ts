import { Router } from 'express';
import type { Request, Response } from 'express';
import { generateContent, GeminiError } from '../lib/gemini.js';

const router = Router();

router.post('/report', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const prompt = `Catatan transaksi hari ini:\n${text}`;
    const sysInst = "Kamu adalah Akuntan handal untuk UMKM Kopi. Berdasarkan catatan bahasa alami yang diberikan, buatkan ringkasan laporan keuangan harian sederhana: Total Pemasukan, Total Pengeluaran, Laba/Rugi Bersih. Berikan juga 1-2 saran manajemen kas singkat. Format rapi dengan tabel markdown jika memungkinkan.";

    const result = await generateContent(prompt, sysInst);
    res.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof GeminiError) {
      res.status(error.statusCode).json({ success: false, message: error.message, code: error.code });
    } else {
      res.status(500).json({ success: false, message: 'Gagal membuat laporan keuangan.', code: 'INTERNAL_ERROR' });
    }
  }
});

export default router;
