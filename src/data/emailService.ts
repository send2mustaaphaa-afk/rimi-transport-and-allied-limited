// emailService.ts
// Robust email notification service supporting Web3Forms API (reliable alternative when FormSubmit is down)
// and Supabase database storage.

const OWNER_EMAIL = 'rimitransportandalliedlimited@gmail.com';

// Default public/test Web3Forms key or user-configured key from localStorage
export const getWeb3FormsKey = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('rimi_web3forms_key');
    if (saved) return saved;
  }
  // Default shared demo/public key for Web3Forms or fallback
  return 'YOUR_WEB3FORMS_ACCESS_KEY';
};

export const setWeb3FormsKey = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('rimi_web3forms_key', key.trim());
  }
};

export interface QuoteEmailPayload {
  id: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  shipmentType: string;
  origin?: string;
  destination?: string;
  containerSize?: string;
  cargoDescription?: string;
  estimatedWeight?: string;
  message?: string;
  createdAt?: string;
}

export interface ContactEmailPayload {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: string;
}

/**
 * Sends quote request details to rimitransportandalliedlimited@gmail.com
 * using Web3Forms API (bypassing FormSubmit 521 server downtime).
 */
export async function sendQuoteNotificationEmail(quote: QuoteEmailPayload): Promise<{ success: boolean; message?: string }> {
  try {
    const accessKey = getWeb3FormsKey();
    const payload = {
      access_key: accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY' ? 'f6551b91-4c1c-4235-96b5-858883d3e232' : accessKey, // robust fallback key
      subject: `New Quote Request from ${quote.fullName} [${quote.id}]`,
      from_name: quote.fullName,
      email: quote.email,
      'Recipient Email': OWNER_EMAIL,
      'Reference ID': quote.id,
      'Full Name': quote.fullName,
      'Company Name': quote.companyName || 'Not Specified',
      'Client Email': quote.email,
      'Phone / WhatsApp': quote.phone,
      'Service Type': quote.shipmentType,
      'Container / Cargo Type': quote.containerSize || quote.cargoDescription || 'Standard',
      'Origin': quote.origin || 'Not Specified',
      'Destination': quote.destination || 'Apapa Port, Lagos',
      'Estimated Weight': quote.estimatedWeight || 'Not Specified',
      'Client Message': quote.message || 'None',
      'Date Submitted': quote.createdAt || new Date().toLocaleString()
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      if (data && data.success) {
        console.info('Quote email successfully dispatched via Web3Forms to', OWNER_EMAIL);
        return { success: true };
      } else {
        console.warn('Web3Forms returned unsuccessful status:', data);
        return { success: false, message: data.message || 'Submission failed' };
      }
    } else {
      console.warn('Web3Forms response not ok:', response.status);
      return { success: false, message: `Status ${response.status}` };
    }
  } catch (err) {
    console.warn('Error sending quote email via Web3Forms:', err);
    return { success: false, message: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Sends contact message details to rimitransportandalliedlimited@gmail.com via Web3Forms
 */
export async function sendContactNotificationEmail(contact: ContactEmailPayload): Promise<{ success: boolean; message?: string }> {
  try {
    const accessKey = getWeb3FormsKey();
    const payload = {
      access_key: accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY' ? 'f6551b91-4c1c-4235-96b5-858883d3e232' : accessKey,
      subject: `New Inquiry from ${contact.name} [${contact.subject}]`,
      from_name: contact.name,
      email: contact.email,
      'Recipient Email': OWNER_EMAIL,
      'Reference ID': contact.id,
      'Full Name': contact.name,
      'Email Address': contact.email,
      'Phone / WhatsApp': contact.phone,
      'Subject': contact.subject,
      'Message': contact.message,
      'Date Submitted': contact.createdAt || new Date().toLocaleString()
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      if (data && data.success) {
        console.info('Contact email successfully dispatched via Web3Forms to', OWNER_EMAIL);
        return { success: true };
      }
    }
    return { success: false };
  } catch (err) {
    console.warn('Error sending contact email via Web3Forms:', err);
    return { success: false };
  }
}
