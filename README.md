# KopiAI

Platform AI untuk UMKM Kedai Kopi Indonesia.

---

## 📦 Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS v4, Framer Motion, Vite |
| Backend | Express 5, TypeScript |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Authentication |
| AI | Google Gemini AI 2.0 Flash |
| Storage | Supabase (Riwayat AI) |

---

## 🚀 Deployment

### Prasyarat

1. Akun [Supabase](https://supabase.com)
2. API Key [Google Gemini](https://ai.google.dev)
3. Akun [Vercel](https://vercel.com) (Frontend)
4. Akun [Render](https://render.com) (Backend)

---

### 1. Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com)
2. Buka **SQL Editor** → paste isi `supabase-schema.sql` → Run
3. **Project Settings** → **API** → catat:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` → `VITE_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

---

### 2. Deploy Backend (Render)

1. Buat **Web Service** di [Render Dashboard](https://dashboard.render.com)
2. Hubungkan repository GitHub
3. Isi konfigurasi:

| Setting | Value |
|---|---|
| **Name** | `kopiai-api` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |

4. Tambahkan **Environment Variables**:

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `GEMINI_API_KEY` | (dari Google AI Studio) |
| `SUPABASE_URL` | (dari Supabase) |
| `SUPABASE_SERVICE_ROLE_KEY` | (dari Supabase) |
| `CORS_ORIGINS` | `https://kopiai.vercel.app` |
| `RATE_LIMIT_MAX` | `100` |

5. Deploy → dapatkan URL: `https://kopiai-api.onrender.com`

---

### 3. Deploy Frontend (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Atau deploy via [Vercel Dashboard](https://vercel.com/new)
3. Hubungkan repository → pilih direktori `frontend/`
4. Set **Root Directory** ke `frontend`
5. Vercel akan otomatis deteksi **Vite** (via `vercel.json`)
6. Tambahkan **Environment Variables**:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | (dari Supabase) |
| `VITE_SUPABASE_ANON_KEY` | (dari Supabase) |
| `VITE_API_URL` | `https://kopiai-api.onrender.com/api` |

7. Deploy → dapatkan URL: `https://kopiai.vercel.app`

---

## 🔧 Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=https://kopiai-api.onrender.com/api
```

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=production

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Security
CORS_ORIGINS=https://kopiai.vercel.app
RATE_LIMIT_MAX=100
```

---

## 🏃 Local Development

```bash
# Backend
cd backend
cp .env.example .env   # isi environment variables
npm install
npm run dev

# Frontend
cd frontend
cp .env.example .env   # isi environment variables
npm install
npm run dev
```

---

## 📂 Struktur Project

```
KopiAI/
├── frontend/              # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/    # UI, layout, landing components
│   │   ├── pages/         # Halaman (Login, Dashboard, dll)
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Supabase client, DB service, retry
│   │   ├── store/         # Auth & Theme context
│   │   └── api/           # HTTP client
│   ├── vercel.json
│   └── .env.example
│
├── backend/               # Express + TypeScript
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── lib/           # Gemini, Auth, Supabase, Error Handler
│   │   └── index.ts       # Entry point
│   └── .env.example
│
├── supabase-schema.sql    # Database migration
└── README.md
```

---

## 🧪 API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/caption/generate` | Bearer Token | AI Caption Generator |
| POST | `/api/customer/reply` | Bearer Token | Customer Reply |
| POST | `/api/business-advisor/analyze` | Bearer Token | Business Advisor |
| POST | `/api/dashboard/insight` | Bearer Token | Daily Business Insight |
| GET | `/api/dashboard/stats` | Bearer Token | Dashboard statistics |
| GET | `/api/health` | No | Health check |
| POST | `/api/marketing/generate` | Bearer Token | Marketing content (legacy) |
| GET | `/api/advisor/chat` | Bearer Token | Advisor chat (legacy) |
| POST | `/api/sales/analyze` | Bearer Token | Sales analysis |
| POST | `/api/finance/report` | Bearer Token | Finance report |
| POST | `/api/translator/translate` | Bearer Token | Menu translator |

---

## 📄 Lisensi

IDCamp Developer Challenge 2026
