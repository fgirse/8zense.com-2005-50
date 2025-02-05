import { resend } from '@/app/api/lib/resend';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  apiKeyId: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { apiKeyId }: Props = body;

  if (!apiKeyId) {
    return NextResponse.json({
      status: 422,
      message: "Unprocessable entity"
    })
  }
  
  try {
    const response = await resend.apiKeys.delete(apiKeyId);

    return NextResponse.json({ status: 200, response });
  } catch (error) {
    return NextResponse.json({ error });
  }
}