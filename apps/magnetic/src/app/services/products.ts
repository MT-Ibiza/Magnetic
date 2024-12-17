import db from '../libs/db';

type SearchParams = {
  searchText: string;
  page: number;
  pageSize: number;
  categoryId?: number;
};

export async function searchProducts(params: SearchParams) {
  const { searchText, page, pageSize, categoryId } = params;
  const offset = (page - 1) * pageSize;

  let products = await db.item.findMany({
    skip: offset,
    take: pageSize,
    where: {
      name: {
        contains: searchText,
        mode: 'insensitive',
      },
      ...(categoryId && { categoryId }),
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      description: true,
      priceInCents: true,
      categoryId: true,
      createdAt: true,
      updatedAt: true,
      serviceId: true,
      service: {
        select: {
          id: true,
          name: true,
        },
      },
      variants: true,
      published: true,
    },
  });

  const totalItems = await db.item.count({
    where: {
      name: {
        contains: searchText,
        mode: 'insensitive',
      },
      ...(categoryId && { categoryId }),
    },
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    products,
  };
}

export function getParamsFromUrl(searchParams: URLSearchParams) {
  const searchText = searchParams.get('search') || '';
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const pageSize = searchParams.get('pageSize')
    ? Number(searchParams.get('pageSize'))
    : 10;
  const categoryId = searchParams.get('categoryId')
    ? Number(searchParams.get('categoryId'))
    : undefined;

  return {
    searchText,
    page,
    pageSize,
    categoryId,
  };
}
