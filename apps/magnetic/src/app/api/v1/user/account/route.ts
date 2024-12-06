import { NewService } from '@magnetic/interfaces';
import db from 'apps/magnetic/src/app/libs/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const userId = 1;
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
