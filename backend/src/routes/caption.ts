import { Router } from 'express';
import type { Request, Response } from 'express';
import { generateContent, GeminiError } from '../lib/gemini.js';

const router = Router();

router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { productName, description, price, targetMarket, platform, tone, emoji, length } = req.body;

    const prompt = `Buatkan konten promosi Instagram untuk produk kopi UMKM dengan detail berikut:

Nama Produk: ${productName || '-'}
Deskripsi Produk: ${description || '-'}
Harga: ${price || '(tidak disebutkan)'}
Target Pelanggan: ${targetMarket || 'Umum'}
Platform: ${platform || 'Instagram'}
Gaya Bahasa: ${tone || 'Santai'}
Penggunaan Emoji: ${emoji || 'Sedikit'}
Panjang Caption: ${length || 'Sedang'}

Buatkan:
## Judul Promosi
[1 judul catchy yang menarik perhatian]

## Caption Utama
[Caption promosi sesuai platform ${platform || 'Instagram'}, gaya bahasa ${tone || 'Santai'}, panjang ${length || 'Sedang'}. Natural dan tidak terdengar seperti AI]

## 10 Hashtag
[10 hashtag relevan dan tren untuk bisnis kopi]

## Call to Action
[1 ajakan yang mendorong pembelian]

## Tips Waktu Upload
[saran kapan waktu terbaik upload konten ini]`;

    const sysInst = "Kamu adalah Digital Marketing Expert khusus UMKM Kopi Indonesia. Kamu sangat memahami tren media sosial di Indonesia. Output seluruhnya dalam Bahasa Indonesia. Caption harus natural, hangat, dan tidak boleh terdengar seperti AI. Gunakan bahasa yang relatable untuk pemilik kedai kopi dan pelanggannya.";

    const result = await generateContent(prompt, sysInst);
    res.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof GeminiError) {
      res.status(error.statusCode).json({ success: false, message: error.message, code: error.code });
    } else {
      res.status(500).json({ success: false, message: 'Gagal menghasilkan caption.', code: 'INTERNAL_ERROR' });
    }
  }
});

export default router;
