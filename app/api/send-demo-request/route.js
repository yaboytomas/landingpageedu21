import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// Uncomment to use SendGrid instead of Nodemailer
// import sgMail from '@sendgrid/mail';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { nombre, escuela, numero, correo, mensaje } = body;

    console.log('Attempting to send email with these settings:');
    console.log('Host:', process.env.EMAIL_HOST);
    console.log('Port:', process.env.EMAIL_PORT);
    console.log('From:', process.env.EMAIL_FROM);
    console.log('To:', process.env.EMAIL_TO);
    console.log('User exists:', !!process.env.EMAIL_USER);
    console.log('Password exists:', !!process.env.EMAIL_PASSWORD);

    // Get recipients (comma-separated list in env var)
    const recipients = process.env.EMAIL_TO.split(',').map(email => email.trim());
    console.log('Recipients:', recipients);

    // Email content (HTML body)
    const emailHtml = `
      <h1>Nueva solicitud de demostración</h1>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Institución:</strong> ${escuela}</p>
      <p><strong>Número de teléfono:</strong> ${numero}</p>
      <p><strong>Correo electrónico:</strong> ${correo}</p>
      ${mensaje ? `<p><strong>Mensaje:</strong> ${mensaje}</p>` : ''}
      <p>Fecha: ${new Date().toLocaleString()}</p>
    `;

    try {
      // OPTION 1: Using Nodemailer with Gmail (current implementation)
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false
        },
        debug: true // Will log information to console
      });
      
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
      const results = await Promise.all(mailPromises);
      console.log('Email sending results:', results);

      /* 
      // OPTION 2: Using SendGrid (uncomment this and install @sendgrid/mail if Gmail doesn't work)
      // Add SENDGRID_API_KEY to your environment variables
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      const mailPromises = recipients.map(recipient => {
        const msg = {
          to: recipient,
          from: process.env.EMAIL_FROM, // Must be verified sender in SendGrid
          subject: `Nueva solicitud de demo - ${nombre} de ${escuela}`,
          html: emailHtml,
        };
        
        return sgMail.send(msg);
      });
      
      // Wait for all emails to be sent
      const results = await Promise.all(mailPromises);
      console.log('Email sending results:', results);
      */

      // Return success response
      return NextResponse.json(
        { success: true, message: 'Demo request sent successfully to all recipients' },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Error in email sending process:', emailError);
      return NextResponse.json(
        { success: false, message: `Email error: ${emailError.message}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    
    // Return error response with more details
    return NextResponse.json(
      { success: false, message: `Failed to send demo request: ${error.message}` },
      { status: 500 }
    );
  }
} 