import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, contact, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const text = `
New Contact Form Message:

Name: ${name}
Email: ${email}
Contact: ${contact || "-"}

Message:
${message}
`;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,  
      replyTo: email,                  
      subject: `New message from ${name}`,
      text,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.log("EMAIL ERROR:", err);
    return new Response(JSON.stringify({ error: "Email failed" }), { status: 500 });
  }
}
