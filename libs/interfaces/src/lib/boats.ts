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
  price_gt?: string;
  price_lt?: string;
  capacity_gt?: string;
  capacity_lt?: string;
  size_gt?: string;
  size_lt?: string;
  from?: string;
  to?: string;
}

// export interface BoatsSearchAttributes {
//   priceGreaterThan?: string;
//   priceLessThan?: string;
//   capacityGreaterThan?: string;
//   capacityLessThan?: string;
//   sizeGreaterThan?: string;
//   sizeLessThan?: string;
//   from?: string;
//   to?: string;
// }

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
  childrenAges: string;
  startTime: string;
  lunchReservation: string;
  comments: string;
  seabob: boolean;
  depositPaid: boolean;
}
