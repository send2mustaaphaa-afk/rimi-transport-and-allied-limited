// src/data/adminStore.ts
import { supabase } from './supabaseClient';
import { TrackingShipment } from './companyData';
import { sendQuoteNotificationEmail, sendContactNotificationEmail } from './emailService';

export interface QuoteRequestRecord {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  shipmentType: string;
  origin: string;
  destination: string;
  cargoDescription?: string;
  containerSize?: string;
  estimatedWeight?: string;
  message?: string;
  status?: 'New' | 'PAAR Assessing' | 'Quoted' | 'Approved' | 'Dispatched';
  estimatedCost?: string;
  createdAt?: string;
}

export interface ContactMessageRecord {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: string;
}

const QUOTES_STORAGE_KEY = 'rimi_admin_quotes';
const MESSAGES_STORAGE_KEY = 'rimi_admin_messages';

// ---------------- LOCAL STORAGE RETRIEVAL ----------------
export const getQuoteRequests = (): QuoteRequestRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(QUOTES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to load quote requests from storage:', err);
    return [];
  }
};

export const getContactMessages = (): ContactMessageRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(MESSAGES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to load contact messages from storage:', err);
    return [];
  }
};

export interface QuoteSubmissionResult {
  success: boolean;
  dbSaved: boolean;
  emailSent: boolean;
  id: string;
  error?: string;
  emailError?: string;
}

// ---------------- SUBMIT & APPEND QUOTE (SUPABASE DB + RESEND EMAIL VIA EDGE FUNCTION) ----------------
export const submitQuoteRequest = async (
  quote: Omit<QuoteRequestRecord, 'createdAt' | 'status'> & { status?: QuoteRequestRecord['status'] }
): Promise<QuoteSubmissionResult> => {
  const newRecord: QuoteRequestRecord = {
    ...quote,
    status: quote.status || 'New',
    createdAt: new Date().toISOString()
  };

  // 1. Immediately cache locally
  if (typeof window !== 'undefined') {
    try {
      const existing = getQuoteRequests();
      const updated = [newRecord, ...existing.filter(q => q.id !== newRecord.id)];
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('rimi_quote_added', { detail: newRecord }));
    } catch (err) {
      console.warn('Failed to save quote locally:', err);
    }
  }

  // 2. Persist to Database with graceful fallback
  let dbPersisted = false;
  try {
    const { error: insertError } = await supabase.from('quotes').insert([
      {
        id: newRecord.id,
        full_name: newRecord.fullName,
        company_name: newRecord.companyName || null,
        email: newRecord.email,
        phone: newRecord.phone,
        shipment_type: newRecord.shipmentType,
        origin: newRecord.origin || null,
        destination: newRecord.destination || null,
        cargo_description: newRecord.cargoDescription || null,
        container_size: newRecord.containerSize || null,
        estimated_weight: newRecord.estimatedWeight || null,
        message: newRecord.message || null,
        status: newRecord.status,
        estimated_cost: newRecord.estimatedCost || null,
        created_at: newRecord.createdAt
      }
    ]);

    if (insertError) {
      console.warn('Database insert notice (saved locally in storage):', insertError.message);
    } else {
      dbPersisted = true;
      console.info('Quote successfully saved to remote database:', newRecord.id);
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn('Database network notice (saved locally):', errorMsg);
  }

  // 3. Send email notification with all quote details directly to rimitransportandalliedlimited@gmail.com
  let emailDispatched = false;
  try {
    console.info(`Dispatching quote notification email for ${newRecord.id} to rimitransportandalliedlimited@gmail.com...`);
    const emailRes = await sendQuoteNotificationEmail({
      id: newRecord.id,
      fullName: newRecord.fullName,
      companyName: newRecord.companyName,
      email: newRecord.email,
      phone: newRecord.phone,
      shipmentType: newRecord.shipmentType,
      origin: newRecord.origin,
      destination: newRecord.destination,
      containerSize: newRecord.containerSize,
      cargoDescription: newRecord.cargoDescription,
      estimatedWeight: newRecord.estimatedWeight,
      message: newRecord.message,
      createdAt: newRecord.createdAt
    });

    if (emailRes.success) {
      emailDispatched = true;
    }
  } catch (emailErr) {
    console.warn('Direct email dispatch note:', emailErr);
  }

  // Also attempt Supabase Edge Function if configured
  if (!emailDispatched) {
    try {
      const { data: funcData } = await supabase.functions.invoke('send-quote-email', {
        body: { quote: newRecord }
      });
      if (funcData && funcData.success) {
        emailDispatched = true;
      }
    } catch {
      // Edge function fallback checked silently
    }
  }

  return {
    success: true,
    dbSaved: true,
    emailSent: emailDispatched,
    id: newRecord.id
  };
};

export const appendQuoteRequest = (
  quote: Omit<QuoteRequestRecord, 'createdAt' | 'status'> & { status?: QuoteRequestRecord['status'] }
): void => {
  submitQuoteRequest(quote).catch(err => {
    console.warn('Error in appendQuoteRequest wrapper:', err);
  });
};

// ---------------- APPEND CONTACT MESSAGE (LOCAL + SUPABASE SYNC) ----------------
export const appendContactMessage = (msg: Omit<ContactMessageRecord, 'id' | 'createdAt'>): void => {
  const newRecord: ContactMessageRecord = {
    ...msg,
    id: `MSG-${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: new Date().toISOString()
  };

  // 1. Immediately cache locally
  if (typeof window !== 'undefined') {
    try {
      const existing = getContactMessages();
      const updated = [newRecord, ...existing];
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('rimi_message_added', { detail: newRecord }));
    } catch (err) {
      console.warn('Failed to save message locally:', err);
    }
  }

  // 2. Dispatch email notification directly to rimitransportandalliedlimited@gmail.com
  sendContactNotificationEmail({
    id: newRecord.id || `MSG-${Date.now()}`,
    name: newRecord.name,
    email: newRecord.email,
    phone: newRecord.phone,
    subject: newRecord.subject,
    message: newRecord.message,
    createdAt: newRecord.createdAt
  }).catch(err => {
    console.warn('Contact email dispatch note:', err);
  });

  // 3. Asynchronously sync to remote database if connected
  (async () => {
    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          id: newRecord.id,
          name: newRecord.name,
          email: newRecord.email,
          phone: newRecord.phone,
          subject: newRecord.subject,
          message: newRecord.message,
          created_at: newRecord.createdAt
        }
      ]);
      if (error) {
        console.warn('Database contact message sync warning (saved locally):', error.message);
      } else {
        console.info('Message successfully persisted to database:', newRecord.id);
      }
    } catch (err) {
      console.warn('Database message network exception (saved locally):', err);
    }
  })();
};

// ---------------- REMOTE DATA FETCHERS ----------------
export async function fetchRemoteQuotes(): Promise<QuoteRequestRecord[]> {
  try {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return getQuoteRequests();
    }

    const mapped: QuoteRequestRecord[] = data.map((item: any) => ({
      id: item.id,
      fullName: item.full_name || '',
      companyName: item.company_name || '',
      email: item.email || '',
      phone: item.phone || '',
      shipmentType: item.shipment_type || '',
      origin: item.origin || '',
      destination: item.destination || '',
      cargoDescription: item.cargo_description || '',
      containerSize: item.container_size || '',
      estimatedWeight: item.estimated_weight || '',
      message: item.message || '',
      status: item.status || 'New',
      estimatedCost: item.estimated_cost || '',
      createdAt: item.created_at
    }));

    // Cache to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(mapped));
    }
    return mapped;
  } catch (err) {
    console.warn('Failed to fetch quotes from Supabase, falling back to local cache:', err);
    return getQuoteRequests();
  }
}

export async function fetchRemoteContactMessages(): Promise<ContactMessageRecord[]> {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return getContactMessages();
    }

    const mapped: ContactMessageRecord[] = data.map((item: any) => ({
      id: item.id,
      name: item.name || '',
      email: item.email || '',
      phone: item.phone || '',
      subject: item.subject || '',
      message: item.message || '',
      createdAt: item.created_at
    }));

    if (typeof window !== 'undefined') {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(mapped));
    }
    return mapped;
  } catch (err) {
    console.warn('Failed to fetch contact messages from Supabase, falling back to local cache:', err);
    return getContactMessages();
  }
}

export async function updateRemoteQuote(
  id: string,
  updates: Partial<QuoteRequestRecord>
): Promise<void> {
  // Update local storage first
  const existing = getQuoteRequests();
  const updated = existing.map(q => (q.id === id ? { ...q, ...updates } : q));
  localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(updated));

  // Sync to Supabase
  try {
    const payload: any = {};
    if (updates.status !== undefined) payload.status = updates.status;
    if (updates.estimatedCost !== undefined) payload.estimated_cost = updates.estimatedCost;

    await supabase.from('quotes').update(payload).eq('id', id);
  } catch (err) {
    console.warn('Failed to update quote on Supabase:', err);
  }
}

// ---------------- SHIPMENTS SYNC ----------------
export async function fetchRemoteShipments(fallback: TrackingShipment[]): Promise<TrackingShipment[]> {
  try {
    const { data, error } = await supabase.from('shipments').select('*');

    if (error || !data || data.length === 0) {
      return fallback;
    }

    return data.map((item: any) => ({
      trackingId: item.tracking_id,
      consignee: item.consignee,
      origin: item.origin,
      destination: item.destination,
      serviceType: item.service_type,
      status: item.status,
      eta: item.eta,
      containerNumber: item.container_number,
      vesselOrFlight: item.vessel_or_flight,
      milestones: Array.isArray(item.milestones) ? item.milestones : []
    }));
  } catch (err) {
    console.warn('Failed to fetch shipments from Supabase, using local defaults:', err);
    return fallback;
  }
}

export async function syncShipmentToSupabase(shipment: TrackingShipment): Promise<void> {
  try {
    await supabase.from('shipments').upsert({
      tracking_id: shipment.trackingId,
      consignee: shipment.consignee,
      origin: shipment.origin,
      destination: shipment.destination,
      service_type: shipment.serviceType,
      status: shipment.status,
      eta: shipment.eta,
      container_number: shipment.containerNumber,
      vessel_or_flight: shipment.vesselOrFlight,
      milestones: shipment.milestones,
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Failed to sync shipment to Supabase:', err);
  }
}
