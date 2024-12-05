// @ts-nocheck
const API = `${import.meta.env.VITE_API_URL}/api`;
const API_URL = `${API}/v1/admin`;

export const WEBSITE_URL = import.meta.env.VITE_API_URL;

//Auth
export const URL_LOGIN = `${API_URL}/login`;

//Services
export const URL_GET_SERVICES = `${API_URL}/services`;
export const URL_NEW_SERVICE = `${API_URL}/services`;

//Packages
export const URL_GET_PACKAGES = `${API_URL}/packages`;
export const URL_NEW_PACKAGE = `${API_URL}/packages`;

//Users
export const URL_GET_USERS = `${API_URL}/users`;
export const URL_GET_USER = (id: number) => `${API_URL}/users/${id}`;
export const URL_UPDATE_USER = (id: number) => `${API_URL}/users/${id}`;
export const URL_NEW_USER = `${API_URL}/users`;
export const URL_REMOVE_USER = (id: number) => `${API_URL}/users/${id}/remove`;
