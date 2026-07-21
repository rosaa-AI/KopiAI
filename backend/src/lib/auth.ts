import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET || 'kopiai-dev-secret-key-2026';

export interface AuthRequest extends Request {
  userId?: string;
}

export function generateToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  try {
    const parts = header.split(' ');
    if (parts.length !== 2) throw new Error('Invalid token format');
    const token = parts[1]!;

    // Try to decode Supabase JWT (signed by Supabase GoTrue)
    const supabasePayload = jwt.decode(token) as jwt.JwtPayload | null;
    if (supabasePayload?.sub) {
      req.userId = supabasePayload.sub;
      next();
      return;
    }

    // Fallback to legacy JWT (signed with our JWT_SECRET)
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      req.userId = String(decoded.userId);
      next();
      return;
    } catch {
      throw new Error('Invalid token');
    }
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
}
