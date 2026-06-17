import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * POST handler for /api/contact
 * Extracts, validates, and sends the contact form message via Resend.
 */
export async function POST(request: Request) {
  try {
    // 1. Ensure RESEND_API_KEY is configured before attempting to send
    if (!process.env.RESEND_API_KEY) {
      console.error('Error: RESEND_API_KEY is not defined in environment variables.');
      return NextResponse.json(
        { error: 'Email service is not configured. Please add RESEND_API_KEY to your environment.' },
        { status: 500 }
      );
    }

    // 2. Parse request JSON body
    const body = await request.json();
    const { name, email, message } = body;

    // 3. Server-side validation
    // These validation steps act as a secondary fallback if client-side validation is bypassed.
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Please enter your name' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json(
        { error: 'Please enter your email' },
        { status: 400 }
      );
    }

    // Basic email pattern check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Please enter your message' },
        { status: 400 }
      );
    }

    // 4. Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 5. Select target recipient
    // Defaults to the portfolio owner's email but can be overridden via server configuration
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || 'ishmamihi777@gmail.com';

    // 6. Send the email using the Resend service
    // - From: must be onboarding@resend.dev (or a verified domain)
    // - To: the configured receiver email address
    // - Reply-To: set to user's email so replies go directly to the sender
    const emailResult = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `New Portfolio Message from ${name.trim()}`,
      replyTo: email.trim(),
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Portfolio Message</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                line-height: 1.6;
                color: #f4f4f6;
                background-color: #08080a;
                margin: 0;
                padding: 40px 20px;
              }
              .card {
                max-width: 580px;
                margin: 0 auto;
                background: #0f0f12;
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 8px;
                padding: 32px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
              }
              .header {
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                padding-bottom: 20px;
                margin-bottom: 24px;
              }
              .header h2 {
                margin: 0;
                font-family: Georgia, serif;
                font-size: 24px;
                color: #d4b26f; /* Cinematic gold */
                letter-spacing: 0.5px;
              }
              .section {
                margin-bottom: 20px;
              }
              .label {
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                color: #8e8e93;
                letter-spacing: 0.15em;
                margin-bottom: 6px;
                display: block;
              }
              .value {
                font-size: 15px;
                color: #f4f4f6;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.05);
                border-left: 3px solid #d4b26f;
                padding: 12px 16px;
                border-radius: 4px;
                white-space: pre-wrap;
              }
              .value a {
                color: #d4b26f;
                text-decoration: none;
              }
              .value a:hover {
                text-decoration: underline;
              }
              .footer {
                margin-top: 32px;
                padding-top: 16px;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
                text-align: center;
                font-size: 12px;
                color: #8e8e93;
              }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="header">
                <h2>New Storytelling Inquiry</h2>
              </div>
              
              <div class="section">
                <span class="label">From (Name)</span>
                <div class="value">${name.trim()}</div>
              </div>
              
              <div class="section">
                <span class="label">Email Address</span>
                <div class="value"><a href="mailto:${email.trim()}">${email.trim()}</a></div>
              </div>
              
              <div class="section">
                <span class="label">Message Details</span>
                <div class="value">${message.trim()}</div>
              </div>
              
              <div class="footer">
                Sent automatically via Imamul Hoque Ishmam's Portfolio Form.
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // 7. Check if Resend API returned an error
    if (emailResult.error) {
      console.error('Resend service failed to send email:', emailResult.error);
      return NextResponse.json(
        { error: emailResult.error.message || 'Failed to send email via Resend.' },
        { status: 500 }
      );
    }

    // 8. Return success response
    return NextResponse.json(
      { success: true, id: emailResult.data?.id },
      { status: 200 }
    );

  } catch (err: unknown) {
    // 9. Catch and log unexpected runtime errors
    const errorMessage = err instanceof Error ? err.message : 'An unexpected server error occurred.';
    console.error('Unhandled exception in contact API endpoint:', err);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
