import db from '../libs/db';

type SearchParams = {
  searchText: string;
  page: number;
  pageSize: number;
  active?: boolean;
  role?: string;
};

export async function searchUsers(params: SearchParams) {
  const { searchText, page, pageSize, role } = params;
  const offset = (page - 1) * pageSize;
  let users = [];
  if (role) {
    users = await db.user.findMany({
      skip: offset,
      take: pageSize,
      where: {
        OR: [{ name: { contains: searchText, mode: 'insensitive' } }],
        active: true,
        role: role as 'client',
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        countryCodePhone: true,
        countryNamePhone: true,
        createdAt: true,
        email: true,
        image: true,
        name: true,
        phone: true,
        role: true,
        active: true,
        packageId: true,
        package: {
          select: {
            name: true,
          },
        },
      },
    });
  } else {
    users = await db.user.findMany({
      skip: offset,
      take: pageSize,
      where: {
        OR: [{ name: { contains: searchText, mode: 'insensitive' } }],
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        countryCodePhone: true,
        countryNamePhone: true,
        createdAt: true,
        email: true,
        image: true,
        name: true,
        phone: true,
        role: true,
        active: true,
        package: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  const totalItems = await db.user.count({
    where: {
      OR: [{ name: { contains: searchText, mode: 'insensitive' } }],
      role: role as 'client',
    },
  });
  const totalPages = Math.ceil(totalItems / pageSize);
  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    users,
  };
}

export function getParamsFromUrl(searchParams: URLSearchParams) {
  const searchText = searchParams.get('search') || '';
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const pageSize = searchParams.get('pageSize')
    ? Number(searchParams.get('pageSize'))
    : 1;
  const active = searchParams.get('active')
    ? searchParams.get('active') === 'true'
    : true;
  const role = searchParams.get('role') || undefined;
  return {
    searchText,
    page,
    pageSize,
    active,
    role,
  };
}
