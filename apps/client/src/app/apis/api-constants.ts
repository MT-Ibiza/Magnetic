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
export const URL_GET_PACKAGE = (id: number) => `${API_URL}/packages/${id}`;
export const URL_GET_PACKAGES = `${API_URL}/packages`;

//Dashboard
export const URL_GET_DASHBOARD = `${API_URL}/dashboard`;

// Cart
export const URL_GET_CART = `${API_URL}/cart`;
export const URL_ADD_TO_CART = `${API_URL}/cart/items`;
export const REMOVE_CART = `${API_URL}/cart`;

// Order
export const URL_CREATE_ORDER = `${API_URL}/orders`;
export const URL_GET_ORDER = (id: number) => `${API_URL}/orders/${id}`;
export const URL_GET_ORDERS = `${API_URL}/orders`;

//TOKEN
export const accessToken = localStorage.getItem('magnetic_auth');
