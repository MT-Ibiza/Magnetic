import {
  getParamsFromUrl,
  searchProducts,
} from 'apps/magnetic/src/app/services/products';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchText, page, pageSize, categoryId } = getParamsFromUrl(
      req.nextUrl.searchParams
    );
    const products = await searchProducts({
      searchText,
      page,
      pageSize,
      categoryId,
    });

    return NextResponse.json(products);
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
