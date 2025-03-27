import { NextRequest, NextResponse } from 'next/server';
import {
  getParamsFromUrl,
  searchUsers,
} from 'apps/magnetic/src/app/services/users';

export async function GET(req: NextRequest) {
  try {
    const { searchText, page, pageSize, active, role } = getParamsFromUrl(
      req.nextUrl.searchParams
    );
    const users = await searchUsers({
      searchText,
      page,
      pageSize,
      active,
      role,
    });

    return NextResponse.json(users);
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
