// @ts-nocheck
const API = `${import.meta.env.VITE_API_URL}/api`;
const API_URL = `${API}/v1/user`;

export const WEBSITE_URL = import.meta.env.VITE_API_URL;

//Auth
export const URL_LOGIN = `${API_URL}/login`;

//Services
export const URL_GET_SERVICES = `${API_URL}/services`;
export const URL_GET_SERVICE = (id: number) => `${API_URL}/services/${id}`;

//Package
export const URL_GET_PACKAGE= (id: number) => `${API_URL}/packages/${id}`;
export const URL_GET_PACKAGES = `${API_URL}/packages`;


//Dashboard
export const URL_GET_DASHBOARD = `${API_URL}/dashboard`;

