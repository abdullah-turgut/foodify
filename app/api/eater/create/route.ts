import prismadb from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prismadb.user.create({
      data: body,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[CREATE_EATER]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
