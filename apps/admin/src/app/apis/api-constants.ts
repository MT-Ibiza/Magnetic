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
export const URL_CREATE_ITEM = (id: number) =>
  `${API_URL}/services/${id}/items`;
export const URL_NEW_ITEM = (id: number) =>
  `${API_URL}/services/${id}/items/new`;
export const URL_UPDATE_ITEM = (serviceId: number, itemId: number) =>
  `${API_URL}/services/${serviceId}/items/${itemId}`;

//Boats
export const URL_GET_BOATS = (serviceId: number) =>
  `${API_URL}/services/${serviceId}/items`;
export const URL_GET_BOAT = (serviceId: number, itemId: number) =>
  `${API_URL}/services/${serviceId}/items/${itemId}`;
export const URL_CREATE_BOAT = (id: number) =>
  `${API_URL}/services/${id}/items`;
export const URL_NEW_BOAT = (id: number) =>
  `${API_URL}/services/${id}/items/new`;
export const URL_UPDATE_BOAT = (serviceId: number, itemId: number) =>
  `${API_URL}/services/${serviceId}/items/${itemId}`;

//Categories
export const URL_GET_CATEGORIES = `${API_URL}/categories`;
export const URL_NEW_CATEGORY = `${API_URL}/categories`;
export const URL_UPDATE_CATEGORY = (id: number) =>
  `${API_URL}/categories/${id}`;
//Packages
export const URL_GET_PACKAGES = `${API_URL}/packages`;
export const URL_NEW_PACKAGE = `${API_URL}/packages`;
export const URL_DATA_NEW_PACKAGE = `${API_URL}/packages/new`;
export const URL_UPDATE_PACKAGE = (id: number) => `${API_URL}/packages/${id}`;
export const URL_GET_PACKAGE = (id: number) => `${API_URL}/packages/${id}`;
export const URL_DELETE_PACKAGE = (id: number) => `${API_URL}/packages/${id}`;

//Users
export const URL_GET_USERS = `${API_URL}/users`;
export const URL_GET_USER = (id: number) => `${API_URL}/users/${id}`;
export const URL_GET_BOOKINGS_USER = (id: number) =>
  `${API_URL}/users/${id}/bookings`;
export const URL_UPDATE_USER = (id: number) => `${API_URL}/users/${id}`;
export const URL_UPDATE_CLIENT = (id: number) =>
  `${API_URL}/users/client/${id}`;
export const URL_UPDATE_ADMIN = (id: number) => `${API_URL}/users/admin/${id}`;
export const URL_REMOVE_ADMIN = (id: number) => `${API_URL}/users/admin/${id}`;
export const URL_NEW_USER = `${API_URL}/users`;
export const URL_NEW_ADMIN = `${API_URL}/users/admin`;
export const URL_NEW_CLIENT = `${API_URL}/users/client`;
export const URL_REMOVE_USER = (id: number) => `${API_URL}/users/${id}`;

//Providers
export const URL_GET_PROVIDERS = `${API_URL}/providers`;
export const URL_GET_PROVIDER = (id: number) => `${API_URL}/providers/${id}`;
export const URL_UPDATE_PROVIDER = (id: number) => `${API_URL}/providers/${id}`;
export const URL_NEW_PROVIDER = `${API_URL}/providers`;
export const URL_REMOVE_PROVIDER = (id: number) => `${API_URL}/providers/${id}`;

//Variants
export const URL_GET_VARIANTS = `${API_URL}/variants`;
export const URL_GET_VARIANT = (id: number) => `${API_URL}/variants/${id}`;
export const URL_UPDATE_VARIANT = (id: number) => `${API_URL}/variants/${id}`;
export const URL_NEW_VARIANT = `${API_URL}/variants`;
export const URL_REMOVE_VARIANT = (id: number) => `${API_URL}/variants/${id}`;

//Products
export const URL_GET_PRODUCTS = `${API_URL}/products`;
export const URL_PUBLISH_PRODUCT = (id: number) =>
  `${API_URL}/products/${id}/publish`;

//Orders
export const URL_GET_ORDERS = `${API_URL}/orders`;
export const URL_GET_BOOKINGS_ORDERS = `${API_URL}/bookings`;
export const URL_GET_ORDER = (id: number) => `${API_URL}/orders/${id}`;

//airtable
export const URL_GET_AIRTABLE_BOATS = `${API_URL}/airtable`;
export const URL_IMPORT_AIRTABLE_BOAT = `${API_URL}/airtable/boat/import`;
export const URL_REIMPORT_AIRTABLE_BOAT = `${API_URL}/airtable/boat/import`;
// export const URL_REIMPORT_AIRTABLE_BOAT = (airtableId: string) =>
//   `${API_URL}/airtable/boat/${airtableId}import`;

export const URL_IMPORT_CALENDAR = (boatId: number) =>
  `${API_URL}/calendars/${boatId}`;
