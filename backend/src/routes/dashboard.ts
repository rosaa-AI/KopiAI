import { Router } from 'express';
import type { Request, Response } from 'express';
import { generateContent, GeminiError } from '../lib/gemini.js';
import type { AuthRequest } from '../lib/auth.js';

const router = Router();

router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const stats = {
      kontenDibuat: { value: 128, change: '+12%' },
      chatTerbalas: { value: 342, change: '+5%' },
      laporanSelesai: { value: 15, change: '+8%' },
      transaksiTercatat: { value: 'Rp 48jt', change: '+23%' },
    };

    const aktivitasTerakhir = [
      { action: 'Caption Instagram dibuat', detail: 'Es Kopi Susu Gula Aren', time: '10 menit lalu', status: 'success' },
      { action: 'Balasan customer dikirim', detail: 'Komplain pesanan telat', time: '1 jam lalu', status: 'success' },
      { action: 'Laporan keuangan', detail: 'Transaksi hari Selasa', time: '3 jam lalu', status: 'info' },
      { action: 'Analisis penjualan', detail: 'Data minggu ini', time: '5 jam lalu', status: 'warning' },
    ];

    res.json({ success: true, data: { stats, aktivitasTerakhir } });
  } catch (error) {
    res.json({ success: false, message: 'Gagal memuat data dashboard.', error: String(error) });
  }
});

router.post('/insight', async (req: AuthRequest, res: Response) => {
  try {
    const prompt = `Buat satu insight bisnis singkat untuk pemilik kedai kopi UMKM di Indonesia. Insight harus:

1. Spesifik untuk bisnis kopi
2. Berbeda dari insight biasanya
3. Bisa langsung diterapkan hari ini
4. Maksimal 2 kalimat
5. Dalam Bahasa Indonesia natural

Contoh: "Hari ini cobalah mempromosikan Es Kopi Susu pada jam 16.00-18.00 karena merupakan jam potensial pembelian."

Jangan gunakan format markdown atau bullet points. Langsung tulis insight-nya saja.`;

    const sysInst = "Kamu adalah AI Business Analyst untuk UMKM Kopi Indonesia. Berikan insight yang segar, unik, dan berbeda setiap kali diminta. Fokus pada tips praktis yang bisa langsung dilakukan pemilik kedai.";

    const result = await generateContent(prompt, sysInst);
    res.json({ success: true, data: result.trim() });
  } catch (error) {
    if (error instanceof GeminiError) {
      res.status(error.statusCode).json({ success: false, message: error.message, code: error.code });
    } else {
      res.status(500).json({ success: false, message: 'Gagal menghasilkan insight.', code: 'INTERNAL_ERROR' });
    }
  }
});

export default router;
