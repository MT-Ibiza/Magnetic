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
  boatSizeInCentimeters: string;
  itemId: number;
}
