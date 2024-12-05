export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  image?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  image?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  accessToken: string;
}
