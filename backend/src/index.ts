import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import captionRouter from './routes/caption.js';
import marketingRouter from './routes/marketing.js';
import customerRouter from './routes/customer.js';
import salesRouter from './routes/sales.js';
import financeRouter from './routes/finance.js';
import advisorRouter from './routes/advisor.js';
import businessAdvisorRouter from './routes/businessAdvisor.js';
import translatorRouter from './routes/translator.js';
import dashboardRouter from './routes/dashboard.js';
import { authMiddleware } from './lib/auth.js';
import { errorHandler, notFoundHandler } from './lib/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));

// CORS
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:3000').split(',');
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(null, true);
  },
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Terlalu banyak request. Silakan coba lagi nanti.' },
});
app.use('/api/', limiter);

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parser
app.use(express.json({ limit: '10mb' }));

// Health check (no auth, no rate limit)
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/caption', authMiddleware, captionRouter);
app.use('/api/marketing', authMiddleware, marketingRouter);
app.use('/api/customer', authMiddleware, customerRouter);
app.use('/api/sales', authMiddleware, salesRouter);
app.use('/api/finance', authMiddleware, financeRouter);
app.use('/api/advisor', authMiddleware, advisorRouter);
app.use('/api/business-advisor', authMiddleware, businessAdvisorRouter);
app.use('/api/translator', authMiddleware, translatorRouter);
app.use('/api/dashboard', authMiddleware, dashboardRouter);
// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`KopiAI Backend running on http://localhost:${PORT}`);
});
