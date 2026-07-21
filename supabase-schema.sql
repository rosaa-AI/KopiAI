-- KopiAI Supabase Schema
-- Jalankan SQL ini di Supabase SQL Editor

-- 1. Users profile table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  store TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  location TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Caption history
CREATE TABLE IF NOT EXISTS public.caption_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  input JSONB NOT NULL,
  output TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Customer reply history
CREATE TABLE IF NOT EXISTS public.customer_reply_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  input TEXT NOT NULL,
  output TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Business advisor history
CREATE TABLE IF NOT EXISTS public.business_advisor_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  input TEXT NOT NULL,
  output TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.caption_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_reply_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_advisor_history ENABLE ROW LEVEL SECURITY;

-- RLS policies: users can only access their own data
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own caption history" ON public.caption_history
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own caption history" ON public.caption_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own caption history" ON public.caption_history
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own customer reply history" ON public.customer_reply_history
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own customer reply history" ON public.customer_reply_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own customer reply history" ON public.customer_reply_history
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own advisor history" ON public.business_advisor_history
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own advisor history" ON public.business_advisor_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own advisor history" ON public.business_advisor_history
  FOR DELETE USING (auth.uid() = user_id);

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.caption_history;
ALTER PUBLICATION supabase_realtime ADD TABLE public.customer_reply_history;
ALTER PUBLICATION supabase_realtime ADD TABLE public.business_advisor_history;
