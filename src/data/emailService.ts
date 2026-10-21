// emailService.ts
// Direct and reliable email notification service sending all form data to rimitransportandalliedlimited@gmail.com

const OWNER_EMAIL = 'rimitransportandalliedlimited@gmail.com';

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
 * Sends quote request details directly to rimitransportandalliedlimited@gmail.com
 * using FormSubmit AJAX API (no public API key failure risks, reliable HTML delivery).
 */
export async function sendQuoteNotificationEmail(quote: QuoteEmailPayload): Promise<{ success: boolean; message?: string }> {
  try {
    const payload = {
      _subject: `New Quote Request from ${quote.fullName} [${quote.id}]`,
      _template: 'table',
      _captcha: 'false',
      _replyto: quote.email,
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

    const response = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      console.info('Quote email notification dispatched to', OWNER_EMAIL, data);
      return { success: true };
    } else {
      console.warn('FormSubmit quote response not ok:', response.status);
      return { success: false, message: `Status ${response.status}` };
    }
  } catch (err) {
    console.warn('Error sending quote email via FormSubmit:', err);
    return { success: false, message: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Sends contact message details directly to rimitransportandalliedlimited@gmail.com
 */
export async function sendContactNotificationEmail(contact: ContactEmailPayload): Promise<{ success: boolean; message?: string }> {
  try {
    const payload = {
      _subject: `New Inquiry from ${contact.name} [${contact.subject}]`,
      _template: 'table',
      _captcha: 'false',
      _replyto: contact.email,
      'Reference ID': contact.id,
      'Full Name': contact.name,
      'Email Address': contact.email,
      'Phone / WhatsApp': contact.phone,
      'Subject': contact.subject,
      'Message': contact.message,
      'Date Submitted': contact.createdAt || new Date().toLocaleString()
    };

    const response = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.info('Contact inquiry email dispatched to', OWNER_EMAIL);
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.warn('Error sending contact email via FormSubmit:', err);
    return { success: false };
  }
}
