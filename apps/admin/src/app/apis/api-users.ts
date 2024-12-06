import {
  EditUser,
  NewUser,
  SearchUsersParams,
  User,
  UserResponse,
} from '@magnetic/interfaces';
import {
  URL_GET_USER,
  URL_GET_USERS,
  URL_NEW_USER,
  URL_UPDATE_USER,
} from './api-constants';

export async function getUsers(
  params: SearchUsersParams
): Promise<UserResponse> {
  const { itemsPerPage, searchText, role } = params;
  const page = 1;
  const pageSize = itemsPerPage || 20;
  const queryParams: Record<string, string> = {
    page: page.toString(),
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

export async function newUser(params: NewUser): Promise<User> {
  const response = await fetch(URL_NEW_USER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function editUser(
  userId: number,
  params: EditUser
): Promise<User> {
  const url = URL_UPDATE_USER(userId);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
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
