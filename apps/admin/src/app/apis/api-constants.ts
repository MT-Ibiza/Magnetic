// @ts-nocheck
const API = `${import.meta.env.VITE_API_URL}/api`;
const API_URL = `${API}/v1/admin`;

export const WEBSITE_URL = import.meta.env.VITE_API_URL;

//Auth
export const URL_LOGIN = `${API_URL}/login`;

//Services
export const URL_GET_SERVICES = `${API_URL}/services`;
export const URL_GET_SERVICE = (id: number) => `${API_URL}/services/${id}`;
export const URL_NEW_SERVICE = `${API_URL}/services`;
export const URL_UPDATE_SERVICE = (id: number) => `${API_URL}/services/${id}`;
export const URL_DATA_NEW_SERVICE = `${API_URL}/services/new`;

//Items
export const URL_GET_ITEMS = (serviceId: number) =>
  `${API_URL}/services/${serviceId}/items`;
export const URL_GET_ITEM = (serviceId: number, itemId: number) =>
  `${API_URL}/services/${serviceId}/items/${itemId}`;
export const URL_NEW_ITEM = (id: number) => `${API_URL}/services/${id}/items`;
export const URL_UPDATE_ITEM = (serviceId: number, itemId: number) =>
  `${API_URL}/services/${serviceId}/items/${itemId}`;

//Packages
export const URL_GET_PACKAGES = `${API_URL}/packages`;
export const URL_NEW_PACKAGE = `${API_URL}/packages`;

//Users
export const URL_GET_USERS = `${API_URL}/users`;
export const URL_GET_USER = (id: number) => `${API_URL}/users/${id}`;
export const URL_UPDATE_USER = (id: number) => `${API_URL}/users/${id}`;
export const URL_NEW_USER = `${API_URL}/users`;
export const URL_REMOVE_USER = (id: number) => `${API_URL}/users/${id}/remove`;
