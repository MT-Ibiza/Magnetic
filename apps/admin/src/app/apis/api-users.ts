import {
  BookingForm,
  EditUser,
  NewUser,
  OrderBookingForm,
  SearchUsersParams,
  User,
  UserResponse,
} from '@magnetic/interfaces';
import {
  URL_GET_BOOKINGS_USER,
  URL_GET_USER,
  URL_GET_USERS,
  URL_NEW_USER,
  URL_UPDATE_USER,
} from './api-constants';

export async function getUsers(
  params: SearchUsersParams
): Promise<UserResponse> {
  console.log(params);
  const { itemsPerPage, searchText, role, page } = params;
  const searchPage = page || 1;
  const pageSize = itemsPerPage || 20;
  const queryParams: Record<string, string> = {
    page: searchPage.toString(),
    pageSize: pageSize.toString(),
  };

  if (searchText) {
    queryParams.search = searchText;
  }

  if (role) {
    queryParams.role = role;
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const url = queryString
    ? `${URL_GET_USERS}?${queryString}`
    : `${URL_GET_USERS}`;
  const response = await fetch(url);
  return await response.json(); 
}

export async function newUser(params: FormData): Promise<User> {
  const response = await fetch(URL_NEW_USER, {
    method: 'POST',
    body: params,
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function editUser(
  userId: number,
  params: FormData
): Promise<User> {
  const url = URL_UPDATE_USER(userId);
  const response = await fetch(url, {
    method: 'PUT',
    body:params,
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function getUser(userId: number): Promise<User> {
  const url = URL_GET_USER(userId);
  const response = await fetch(url);
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function getBookings(userId: number): Promise<BookingForm[]> {
  const url = URL_GET_BOOKINGS_USER(userId);
  const response = await fetch(url);
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
