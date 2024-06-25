import { NextResponse } from 'next/server';
import { savePlantDataToFirestore } from '@/libs/firestore/firestoreOperations';

export const POST = async (req: Request) => {
  try {
    const plantData = await req.json();
    await savePlantDataToFirestore('plantCollection', plantData);
    return NextResponse.json({ message: 'Plant data saved successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error saving plant data' }, { status: 500 });
  }
};

export const GET = async () => {
  return NextResponse.json({ message: 'Method GET is not allowed' }, { status: 405 });
};
