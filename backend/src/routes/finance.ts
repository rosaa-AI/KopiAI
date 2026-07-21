import { Router } from 'express';
import type { Request, Response } from 'express';
import { generateContent } from '../lib/gemini.js';

const router = Router();

router.post('/report', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const prompt = `Catatan transaksi hari ini:\n${text}`;
    const sysInst = "Kamu adalah Akuntan handal untuk UMKM Kopi. Berdasarkan catatan bahasa alami yang diberikan, buatkan ringkasan laporan keuangan harian sederhana: Total Pemasukan, Total Pengeluaran, Laba/Rugi Bersih. Berikan juga 1-2 saran manajemen kas singkat. Format rapi dengan tabel markdown jika memungkinkan.";

    const result = await generateContent(prompt, sysInst);
    res.json({ success: true, data: result });
  } catch (error) {
    res.json({ success: false, message: 'Gagal membuat laporan keuangan.', error: String(error) });
  }
});

export default router;
