export interface FormSubmitParams<T> {
  form: T;
  quantity?: number;
  variantId?: number;
  seasonId?: number;
}

export interface ChefStaffFormData {
  menu: string;
  date: string;
  time: string;
  numberOfPeople: number;
  kidsAges: string;
  location: string;
  dietaryComments: string;
}

export interface BoatCharterFormData {
  date: string;
  boat: string;
  numberOfPeople: number;
  childrenAges: string;
  startTime: string;
  lunchReservation: string;
  comments: string;
  seabob: boolean;
  depositPaid: boolean;
}

export interface DrinksDeliveryFormData {
  date: string;
  location: string;
  acceptSubstitutes: boolean;
  minimumSpend: number;
  paymentConfirmed: boolean;
}

export interface RestaurantBookingFormData {
  venue: string;
  date: string;
  preferredTime: string;
  numberOfPeople: number;
  kidsAges: string;
  comments: string;
}

export interface SecurityFormData {
  service: string;
  dates: string;
  startTime: string;
  finishTime: string;
  location: string;
  comments: string;
  paymentConfirmed: boolean;
}

export interface SingleChefServiceFormData {
  date: string;
  startTime: string;
  numberOfPeople: number;
  kidsAges: string;
  location: string;
  dietaryComments: string;
}

export interface SpaBeautyFormData {
  service: string;
  dates: string;
  time: string;
  numberOfPeople: number;
  location: string;
  comments: string;
  paymentConfirmed: boolean;
}

export interface TransferFormData {
  date: string;
  time: string;
  pickUpLocation: string;
  dropOffLocation: string;
  numberOfPeople: number;
  contactName: string;
  contactNumber: string;
  flightNumber: string;
  luggageAmount: number;
  childSeats: string;
  paymentConfirmed: boolean;
  variantId?: number;
}

export interface WeeklyButlerServiceFormData {
  service: string;
  date: string;
  startTime: string;
  numberOfPeople: number;
  numberOfWeeks: number;
  childrenAges: string;
  commentsPreference: string;
  location: string;
}

export interface WeeklyChefServiceFormData {
  service: string;
  date: string;
  startTime: string;
  numberOfPeople: number;
  numberOfWeeks: number;
  childrenAges: string;
  location: string;
  dietaryComments: string;
  shoppingListRequests: string;
  firstMealRequests: string;
}

export interface WellnessFitnessFormData {
  service: string;
  dates: string;
  time: string;
  numberOfPeople: number;
  location: string;
  comments: string;
  paymentConfirmed: boolean;
}

export interface ClubBookingFormData {
  venue: string;
  date: string;
  numberOfPeople: number;
  comments: string;
}

export interface ChildcareFormData {
  service: string;
  kidsAges: string;
  startDateTime: string;
  finishDateTime: string;
  location: string;
  comments: string;
  disclaimerAccepted: boolean;
  paymentConfirmed: boolean;
}
