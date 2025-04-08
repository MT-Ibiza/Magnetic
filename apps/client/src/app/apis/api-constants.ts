// @ts-nocheck
const API = `${import.meta.env.VITE_API_URL}/api`;
export const API_URL = `${API}/v1/user`;
export const API_LIST = `${API}/v1/lists`;
export const API_GUEST = `${API}/v1/guest`;

export const WEBSITE_URL = import.meta.env.VITE_API_URL;

//Auth
export const URL_LOGIN = `${API_URL}/login`;

//Client
export const URL_GET_CLIENT = `${API_URL}/account`;
export const URL_GET_CURRENT_USER = `${API_URL}`;
export const URL_UPDATE_CLIENT = `${API_URL}/account`;

//Services
export const URL_GET_SERVICES = `${API_URL}/services`;
export const URL_GET_SERVICE = (id: number) => `${API_URL}/services/${id}`;
export const URL_GET_SERVICE_BOAT = `${API_URL}/services/boats`;
export const URL_GET_BOAT = (itemId: number) =>
  `${API_URL}/services/boats/${itemId}`;
export const URL_GET_SERVICE_DRINKS = `${API_URL}/services/drinks`;

//Items
export const URL_GET_ITEM = (serviceId: number, itemId: number) =>
  `${API_URL}/services/${serviceId}/items/${itemId}`;

//Package
export const URL_GET_PACKAGE = (id: number) => `${API_URL}/packages/${id}`;
export const URL_GET_PACKAGES = `${API_URL}/packages`;

//Dashboard
export const URL_GET_DASHBOARD = `${API_URL}/dashboard`;

// Cart
export const URL_GET_CART = `${API_URL}/cart`;
export const REMOVE_CART = `${API_URL}/cart`;

//CartItem
export const URL_ADD_SERVICE_TO_CART = `${API_URL}/cart/cartItem/services`;
export const URL_ADD_PRODUCT_TO_CART = `${API_URL}/cart/cartItem/products`;
export const URL_ADD_BOAT_TO_CART = `${API_URL}/cart/cartItem/boats`;
export const URL_ADD_DRINK_TO_CART = `${API_URL}/cart/cartItem/drinks`;
export const URL_EDIT_FORM_CART_ITEM = `${API_URL}/cart/cartItem/forms`;
export const URL_REMOVE_CART_ITEM = (id: number) =>
  `${API_URL}/cart/cartItem/${id}`;

// Order
export const URL_CREATE_ORDER = `${API_URL}/orders`;
export const URL_GET_ORDER = (id: number) => `${API_URL}/orders/${id}`;
export const URL_GET_ORDERS = `${API_URL}/orders`;
export const URL_EDIT_FORM_ORDER = (id: number) =>
  `${API_URL}/orders/forms/${id}`;

//Bookings
export const URL_GET_BOOKINGS = `${API_URL}/bookings`;
export const URL_REQUEST_CHANGES_BOOKINGS = (id: number) =>
  `${API_URL}/bookings/${id}/modify`;

//Boats
export const URL_SEARCH_BOATS = (query: string) =>
  `${API_URL}/boats/search?${query}`;

export const URL_SEARCH_BOAT_AVAILABILITY = (query: string) =>
  `${API_URL}/boats/availability?${query}`;

//Request a call
export const URL_REQUEST_CALL = `${API_URL}/call`;

//Payments
export const URL_REQUEST_PAYMENT = `${API_URL}/payment`;
export const URL_REQUEST_PAYMENT_SUCCESS = `${API_URL}/payment/success`;
export const URL_REQUEST_PAYMENT_FAILURE = `${API_URL}/payment/failure`;

//Drinks
export const URL_SEARCH_DRINKS = (query: string) =>
  `${API_URL}/drinks/search?${query}`;

export const URL_LIST_DRINKS = (query: string) =>
  `${API_LIST}/drinks/?${query}`;

export const URL_GET_DRINKS_SERVICE = `${API_LIST}/drinks`;
export const URL_GET_PUBLIC_LIST = (slug: string) => `${API_LIST}/${slug}`;
export const URL_GET_PUBLIC_ITEM_LIST = (slug: string, itemId: number) =>
  `${API_LIST}/${slug}/items/${itemId}`;

// Guest Cart
export const URL_GET_GUEST_CART = `${API_GUEST}/cart`;
export const REMOVE_GUEST_CART = `${API_GUEST}/cart`;

//Guest CartItem
export const URL_ADD_SERVICE_TO_GUEST_CART = `${API_GUEST}/cart/cartItem/services`;
export const URL_ADD_PRODUCT_TO_GUEST_CART = `${API_GUEST}/cart/cartItem/products`;
export const URL_ADD_BOAT_TO_GUEST_CART = `${API_GUEST}/cart/cartItem/boats`;
export const URL_ADD_DRINK_TO_GUEST_CART = `${API_GUEST}/cart/cartItem/drinks`;
export const URL_EDIT_FORM_GUEST_CART_ITEM = `${API_GUEST}/cart/cartItem/forms`;
export const URL_REMOVE_GUEST_CART_ITEM = (id: number) =>
  `${API_GUEST}/cart/cartItem/${id}`;
