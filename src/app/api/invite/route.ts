
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend("re_gowoCR3s_KHFmVcVZYc5X6WxRHNvoDsn6");


export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'samarpit.santoki@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}