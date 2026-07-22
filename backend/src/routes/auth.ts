import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Nama, email, dan password harus diisi.',
        code: 'VALIDATION_ERROR',
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: 'Password minimal 6 karakter.',
        code: 'VALIDATION_ERROR',
      });
      return;
    }

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      res.status(500).json({
        success: false,
        message: 'Konfigurasi server tidak lengkap.',
        code: 'CONFIG_ERROR',
      });
      return;
    }

    const createRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        user_metadata: { name },
      }),
    });

    const createData = await createRes.json() as { id?: string; msg?: string };

    if (!createRes.ok) {
      const msg = createData.msg || 'Gagal membuat akun. Silakan coba lagi.';
      res.status(createRes.status).json({ success: false, message: msg, code: 'REGISTRATION_ERROR' });
      return;
    }

    const userId = createData.id;

    const upsertRes = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        id: userId,
        name,
        email,
        store: '',
        location: '',
        updated_at: new Date().toISOString(),
      }),
    });

    if (!upsertRes.ok) {
      const upsertErr = await upsertRes.text();
      console.error(`[Auth] Failed to create profile for ${userId}: ${upsertErr}`);
    }

    res.json({ success: true, message: 'Akun berhasil dibuat. Silakan masuk.' });
  } catch (err) {
    console.error('[Auth] Register error:', err);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server. Silakan coba lagi.',
      code: 'SERVER_ERROR',
    });
  }
});

export default router;
