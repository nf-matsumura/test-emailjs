import { ThanksTemplate } from '~/app/components/Email/ThanksTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';
 
// 環境変数からResendのAPIキーを取得
const resend = new Resend(process.env.RESEND_API_KEY);
 
// 環境変数から送信元に指定するメールアドレスを取得
const fromEmail = process.env.RESEND_FROM_EMAIL;
 
export async function POST(request: Request) {
  // お問い合わせフォームからのデータを取得
  // name, email, message
  const req = await request.json();
 
  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail ?? 'ヘルプ <matsumura@newfolk.jp>',
      to: [req.email],
      subject: 'お問い合わせありがとうございます',
      // ThanksTemplate.tsxで作成したテンプレートを使用
      react: ThanksTemplate({
        senderName: req.name,
        content: req.message,
      }) as React.ReactElement,
    });
 
    if (error) {
      return NextResponse.json({ error });
    }
 
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
