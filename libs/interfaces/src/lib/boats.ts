export interface BoatBase {
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
  sizeInCentimeters: number;
  itemId: number;
}

export interface Boat extends BoatBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoatAttributes {
  id?: number;
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
