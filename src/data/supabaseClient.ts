import { createClient } from '@supabase/supabase-js';
import { TrackingShipment } from './companyData';

// User-provided Supabase credentials with environment fallback
const RAW_URL = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://brclfzknbsveotjzwzyi.supabase.co';
// Strip trailing /rest/v1 or trailing slashes if present
export const SUPABASE_URL = RAW_URL.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
export const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyY2xmemtuYnN2ZW90anp3enlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzODY3MTMsImV4cCI6MjEwNjk2MjcxM30.TvGBe5OJByjE1iHSUoGfy9gI13JMk0CSz1hAG1vtn2s';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export const SQL_SCHEMA_SETUP = `-- ====================================================================
-- RIMI TRANSPORT & ALLIED LIMITED - CLEAN SUPABASE SCHEMA
-- ====================================================================

-- 1. QUOTES TABLE
create table if not exists public.quotes (
  id text primary key,
  full_name text not null,
  company_name text,
  email text not null,
  phone text not null,
  shipment_type text not null,
  origin text,
  destination text,
  cargo_description text,
  container_size text,
  estimated_weight text,
  message text,
  status text default 'New',
  estimated_cost text,
  created_at timestamptz default now() not null
);

-- 2. CONTACT INQUIRIES TABLE
create table if not exists public.contact_messages (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now() not null
);

-- 3. SHIPMENTS & TRACKING TABLE
create table if not exists public.shipments (
  tracking_id text primary key,
  consignee text not null,
  origin text not null,
  destination text not null,
  service_type text not null,
  status text not null,
  eta text not null,
  container_number text,
  vessel_or_flight text,
  milestones jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now() not null
);

-- 4. ENABLE ROW LEVEL SECURITY
alter table public.quotes enable row level security;
alter table public.contact_messages enable row level security;
alter table public.shipments enable row level security;

-- 5. ACCESS POLICIES (Explicit roles & WITH CHECK for Supabase Linter)
drop policy if exists "Allow public read quotes" on public.quotes;
create policy "Allow public read quotes" on public.quotes
  for select to anon, authenticated using (true);

drop policy if exists "Allow public insert quotes" on public.quotes;
create policy "Allow public insert quotes" on public.quotes
  for insert to anon, authenticated with check (true);

drop policy if exists "Allow public update quotes" on public.quotes;
create policy "Allow public update quotes" on public.quotes
  for update to anon, authenticated using (true) with check (true);

drop policy if exists "Allow public read contact_messages" on public.contact_messages;
create policy "Allow public read contact_messages" on public.contact_messages
  for select to anon, authenticated using (true);

drop policy if exists "Allow public insert contact_messages" on public.contact_messages;
create policy "Allow public insert contact_messages" on public.contact_messages
  for insert to anon, authenticated with check (true);

drop policy if exists "Allow public read shipments" on public.shipments;
create policy "Allow public read shipments" on public.shipments
  for select to anon, authenticated using (true);

drop policy if exists "Allow public insert shipments" on public.shipments;
create policy "Allow public insert shipments" on public.shipments
  for insert to anon, authenticated with check (true);

drop policy if exists "Allow public update shipments" on public.shipments;
create policy "Allow public update shipments" on public.shipments
  for update to anon, authenticated using (true) with check (true);
`;

export interface SupabaseHealth {
  connected: boolean;
  message: string;
  url: string;
  tables: {
    quotes: boolean;
    contact_messages: boolean;
    shipments: boolean;
  };
}

/**
 * Checks connection to the configured Supabase instance
 */
export async function checkSupabaseHealth(): Promise<SupabaseHealth> {
  const result: SupabaseHealth = {
    connected: false,
    message: '',
    url: SUPABASE_URL,
    tables: {
      quotes: false,
      contact_messages: false,
      shipments: false
    }
  };

  try {
    // 1. Check basic response from quotes table
    const { error: quoteErr } = await supabase.from('quotes').select('id').limit(1);
    if (!quoteErr) {
      result.tables.quotes = true;
    } else if (quoteErr.code !== 'PGRST205' && quoteErr.code !== '42P01') {
      // If error code is not "table does not exist", connection succeeded
      result.connected = true;
    }

    // 2. Check contact_messages table
    const { error: msgErr } = await supabase.from('contact_messages').select('id').limit(1);
    if (!msgErr) {
      result.tables.contact_messages = true;
    }

    // 3. Check shipments table
    const { error: shipErr } = await supabase.from('shipments').select('tracking_id').limit(1);
    if (!shipErr) {
      result.tables.shipments = true;
    }

    result.connected = true;
    result.message = 'Supabase REST API connected successfully';
    return result;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    result.connected = false;
    result.message = errorMsg || 'Unable to connect to Supabase';
    return result;
  }
}
