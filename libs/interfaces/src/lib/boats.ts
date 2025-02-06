export interface BoatBase {
  boatType: string;
  port: string;
  capacity: number;
  crew: number;
  beamInMeters: number;
  sizeInMeters: number;
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

export interface BoatAttributes {
  id?: number;
  airtableId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  boatType: string;
  berth: string;
  guests: number;
  crew: number;
  beamInCentimeters: number;
  cabins: number;
  fuelConsumption: number;
  description?: string;
  latitude?: string;
  longitude?: string;
  sizeInCentimeters: string;
  itemId: number;
}

export interface BoatsSearchAttributes {
  boatType?: string;
  guests?: string;
  crew?: string;
  size?: string;
  priceGreaterThan?: string;
  priceLessThan?: string;
}
