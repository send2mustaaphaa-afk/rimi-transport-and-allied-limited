import { corsHeaders } from '../_shared/cors.ts';

// Supabase Edge Function to send Quote Email notifications via Resend API
// Destination Owner: rimitransportandalliedlimited@gmail.com

const OWNER_EMAIL = 'rimitransportandalliedlimited@gmail.com';

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed. Expected POST.' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured in Supabase Edge Function secrets.');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'RESEND_API_KEY is missing in Supabase Edge Function secrets. Please add it using: supabase secrets set RESEND_API_KEY=re_...'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Sender address: verified custom domain or Resend testing onboarding domain
    // e.g., 'Rimi Transport <quotes@rimitransport.com>' or 'Rimi Transport <onboarding@resend.dev>'
    const fromEmail =
      Deno.env.get('FROM_EMAIL') || 'Rimi Transport Quotes <onboarding@resend.dev>';

    // Parse payload (supports direct invocation or database webhook payload)
    const body = await req.json().catch(() => ({}));
    const rawQuote = body.quote || body.record || body;

    const fullName =
      rawQuote.full_name || rawQuote.fullName || rawQuote.name || 'Prospective Client';
    const company =
      rawQuote.company_name || rawQuote.companyName || rawQuote.company || 'Not Specified';
    const email = rawQuote.email || 'N/A';
    const phone = rawQuote.phone || 'N/A';
    const serviceType =
      rawQuote.shipment_type || rawQuote.shipmentType || rawQuote.service || 'Customs Clearance';
    const containerType =
      rawQuote.container_size ||
      rawQuote.containerSize ||
      rawQuote.cargo_description ||
      '20ft Container (FCL)';
    const origin = rawQuote.origin || 'Not Specified';
    const destination = rawQuote.destination || 'Apapa Port, Lagos';
    const message = rawQuote.message || 'No additional message provided';
    const quoteId = rawQuote.id || `RTL-QT-${Date.now().toString().slice(-6)}`;
    const formattedDate = new Date().toLocaleString('en-US', {
      timeZone: 'Africa/Lagos',
      dateStyle: 'full',
      timeStyle: 'short'
    });

    const subject = `New Quote Request from ${fullName}`;

    // Clean phone number for WhatsApp link
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const whatsappLink = cleanPhone ? `https://wa.me/${cleanPhone}` : '';

    // HTML Email Template
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0; }
    .header { background: #0f172a; padding: 28px 32px; color: #ffffff; border-bottom: 4px solid #f59e0b; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; color: #f59e0b; text-transform: uppercase; }
    .header p { margin: 6px 0 0 0; font-size: 13px; color: #94a3b8; }
    .badge-bar { background: #f8fafc; padding: 12px 32px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #64748b; }
    .ref-badge { background: #0f172a; color: #f59e0b; padding: 4px 10px; border-radius: 4px; font-weight: 700; font-family: monospace; font-size: 13px; }
    .content { padding: 32px; }
    .alert-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 14px 18px; border-radius: 6px; margin-bottom: 24px; font-size: 13px; color: #92400e; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table th, .table td { padding: 12px 14px; text-align: left; font-size: 13px; vertical-align: top; border-bottom: 1px solid #f1f5f9; }
    .table th { width: 34%; font-weight: 700; color: #475569; background: #f8fafc; border-right: 1px solid #e2e8f0; }
    .table td { color: #0f172a; font-weight: 500; }
    .message-block { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
    .btn-container { text-align: center; margin-top: 28px; padding-top: 24px; border-top: 1px solid #e2e8f0; }
    .btn { display: inline-block; padding: 12px 24px; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 6px; margin: 4px 6px; }
    .btn-reply { background: #f59e0b; color: #0f172a !important; }
    .btn-whatsapp { background: #10b981; color: #ffffff !important; }
    .footer { background: #f8fafc; padding: 20px 32px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>RIMI TRANSPORT &amp; ALLIED LIMITED</h1>
      <p>Maritime Logistics &bull; Customs Clearance &bull; Inland Freight &bull; Apapa Lagos</p>
    </div>
    <div class="badge-bar">
      <div><strong>Quote Ref:</strong> <span class="ref-badge">${quoteId}</span></div>
      <div><span>${formattedDate}</span></div>
    </div>
    <div class="content">
      <div class="alert-box">
        <strong>New Customer Inquiry:</strong> A prospective client has submitted an instant quotation request on your website. Review the specifications below to issue a proforma invoice or call back.
      </div>

      <table class="table">
        <tbody>
          <tr>
            <th>Full Name</th>
            <td><strong style="color: #0f172a; font-size: 14px;">${fullName}</strong></td>
          </tr>
          <tr>
            <th>Company</th>
            <td>${company}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td><a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email}</a></td>
          </tr>
          <tr>
            <th>Phone / WhatsApp</th>
            <td><a href="tel:${phone}" style="color: #0f172a; text-decoration: none; font-weight: 600;">${phone}</a></td>
          </tr>
          <tr>
            <th>Service Type</th>
            <td><span style="background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 12px;">${serviceType}</span></td>
          </tr>
          <tr>
            <th>Container / Cargo Type</th>
            <td>${containerType}</td>
          </tr>
          <tr>
            <th>Origin</th>
            <td>${origin}</td>
          </tr>
          <tr>
            <th>Destination</th>
            <td>${destination}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <strong style="font-size: 13px; color: #475569;">Customer Cargo Details &amp; Message:</strong>
        <div class="message-block">${message}</div>
      </div>

      <div class="btn-container">
        <a href="mailto:${email}?subject=Re:%20Logistics%20Quote%20Request%20(${quoteId})%20-%20RIMI%20TRANSPORT" class="btn btn-reply">
          Reply to Customer via Email
        </a>
        ${cleanPhone ? `<a href="${whatsappLink}" class="btn btn-whatsapp" target="_blank">Chat with Customer on WhatsApp</a>` : ''}
      </div>
    </div>
    <div class="footer">
      This notification was automatically sent by your Supabase Edge Function to <strong>${OWNER_EMAIL}</strong>.<br/>
      RIMI TRANSPORT AND ALLIED LIMITED &bull; 11A Pelewura Way, Apapa, Lagos, Nigeria
    </div>
  </div>
</body>
</html>
`;

    // Plain text version
    const text = `
NEW QUOTE REQUEST - RIMI TRANSPORT AND ALLIED LIMITED
======================================================
Reference ID: ${quoteId}
Date: ${formattedDate}

CUSTOMER DETAILS:
- Full Name: ${fullName}
- Company: ${company}
- Email: ${email}
- Phone: ${phone}

SHIPMENT SPECIFICATIONS:
- Service Type: ${serviceType}
- Container / Cargo Type: ${containerType}
- Origin: ${origin}
- Destination: ${destination}

MESSAGE & CARGO DETAILS:
${message}

------------------------------------------------------
To respond to this customer, reply directly to: ${email} or call ${phone}.
Notification sent to: ${OWNER_EMAIL}
`;

    console.log(`Sending quote notification for "${fullName}" (${quoteId}) to ${OWNER_EMAIL}...`);

    // Call Resend Email API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [OWNER_EMAIL],
        reply_to: email.includes('@') ? email : undefined,
        subject: subject,
        html: html,
        text: text
      })
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend API responded with error:', resendData);
      return new Response(
        JSON.stringify({
          success: false,
          error: resendData.message || resendData.error || 'Failed to dispatch email via Resend API',
          details: resendData
        }),
        {
          status: resendResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Resend email delivered successfully. Message ID:', resendData.id);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Quote notification email sent successfully',
        id: resendData.id,
        recipient: OWNER_EMAIL
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Unhandled Edge Function error:', errorMsg);
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMsg || 'Internal server error while processing quote notification'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
