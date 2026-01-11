import { inquiries } from '@/db/mock-data';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  await new Promise((resolve) => setTimeout(resolve, 500));

  const search = searchParams.get('search')?.toLowerCase();
  const minValue = Number(searchParams.get('minValue')) || 0;

  let filtered = [...inquiries];

  if (search) {
    filtered = filtered.filter((i) =>
      i.clientName.toLowerCase().includes(search)
    );
  }

  if (minValue > 0) {
    filtered = filtered.filter((i) => i.potentialValue >= minValue);
  }  

  return NextResponse.json(filtered);
}