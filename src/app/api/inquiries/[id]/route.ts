import { updateInquiryPhase } from '@/db/mock-data';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { phase } = body;

    await new Promise((resolve) => setTimeout(resolve, 500));

    updateInquiryPhase(params.id, phase);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}