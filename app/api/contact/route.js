import { Resend } from "resend";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM || "HR Greenroots Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return Response.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = (payload.name || "").toString().trim();
  const email = (payload.email || "").toString().trim();
  const phone = (payload.phone || "").toString().trim();
  const address = (payload.address || "").toString().trim();
  const message = (payload.message || "").toString().trim();

  if (!name || !email || !message) {
    return Response.json(
      { ok: false, error: "Please provide your name, email, and project details." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  const subject = `New website inquiry from ${name}`;

  const plain = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    address && `Address: ${address}`,
    "",
    "Project details:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#173220;background:#fafaf5;">
      <h2 style="margin:0 0 16px;font-size:20px;color:#2b622a;">New website inquiry</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#5b685d;width:110px;">Name</td><td style="padding:6px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><td style="padding:6px 0;color:#5b685d;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#2b622a;">${escapeHtml(email)}</a></td></tr>
        ${phone ? `<tr><td style="padding:6px 0;color:#5b685d;">Phone</td><td style="padding:6px 0;">${escapeHtml(phone)}</td></tr>` : ""}
        ${address ? `<tr><td style="padding:6px 0;color:#5b685d;">Address</td><td style="padding:6px 0;">${escapeHtml(address)}</td></tr>` : ""}
      </table>
      <div style="margin-top:20px;padding:16px;background:#ffffff;border:1px solid rgba(23,50,32,0.12);border-radius:12px;">
        <p style="margin:0 0 8px;color:#5b685d;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Project details</p>
        <p style="margin:0;white-space:pre-wrap;line-height:1.55;">${escapeHtml(message)}</p>
      </div>
      <p style="margin-top:24px;font-size:12px;color:#5b685d;">Sent from the HR Greenroots Landscaping website contact form.</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text: plain,
      html,
    });

    if (error) {
      return Response.json({ ok: false, error: error.message || "Send failed." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: err?.message || "Unexpected error." },
      { status: 500 }
    );
  }
}
