import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { nombre, escuela, numero, correo, mensaje } = body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Get recipients (comma-separated list in env var)
    const recipients = process.env.EMAIL_TO.split(',').map(email => email.trim());

    // Email content
    const emailHtml = `
      <h1>Nueva solicitud de demostración</h1>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Institución:</strong> ${escuela}</p>
      <p><strong>Número de teléfono:</strong> ${numero}</p>
      <p><strong>Correo electrónico:</strong> ${correo}</p>
      ${mensaje ? `<p><strong>Mensaje:</strong> ${mensaje}</p>` : ''}
      <p>Fecha: ${new Date().toLocaleString()}</p>
    `;

    // Send email to each recipient
    const mailPromises = recipients.map(recipient => {
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: recipient,
        subject: `Nueva solicitud de demo - ${nombre} de ${escuela}`,
        html: emailHtml,
      };
      
      return transporter.sendMail(mailOptions);
    });

    // Wait for all emails to be sent
    await Promise.all(mailPromises);

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Demo request sent successfully to all recipients' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error response
    return NextResponse.json(
      { success: false, message: 'Failed to send demo request' },
      { status: 500 }
    );
  }
} 