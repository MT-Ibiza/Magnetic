export interface BoatBase {
  id: number;
  boatType?: string;
  port: string;
  capacity: number;
  crew: number;
  beamInMeters: number;
  sizeInFeet: number;
  lengthInMeters: number;
  cabins: number;
  fuelConsumption: number;
  description?: string;
  latitude?: string;
  longitude?: string;
  itemId: number;
  secondName?: string;
}

export interface Boat extends BoatBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoatsSearchAttributes {
  boatType?: string;
  capacity?: string;
  crew?: string;
  size?: string;
  priceGreaterThan?: string;
  priceLessThan?: string;
  from?: string;
  to?: string;
}

export interface BoatAvailability {
  id: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  boatId: number;
  source: string;
  text: string;
}

//FORM
export interface BoatCharterFormData {
  date: string;
  boat: string;
  numberOfPeople: number;
  kidsAges: string;
  startTime: string;
  lunchBooking: string;
  comments: string;
  extras: string;
  depositPaid: boolean;
}
