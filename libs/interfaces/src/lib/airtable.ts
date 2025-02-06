export interface AirtableParams {
  offset?: string;
  pageSize: number;
  importedBoats: {
    airtableId: string | null;
    id: number;
  }[];
}

export interface AirtableBoatResponse {
  offset: string;
  records: AirtableBoat[];
}

export interface AirtableBoatField {
  id: string;
  fields: {
    Boat: string;
    Capacity: number;
    'Length (M)': number;
    'Length (F)': number;
    Crew: number;
    Cabins: number;
    'Beam (M)': number;
    Port: string;
    'Fuel Consuption (L/H)': number;
    Included: string;
    Pricing: string;
    Supplier: string[];
    Type: string;
    Name: string;
    Status: string;
    // Images: [ [Object], [Object], [Object], [Object], [Object] ],
    'Size (Range)': string[];
    'Extras (Select)': string[];
    Year: '2021';
    Low: string[];
    Mid: string[];
    High: string[];
    'Calendar Link': string;
    'Capacity (Select)': string[];
    // Logo: [ [Object] ],
    'Latest Pricing': boolean;
    Destination: string[];
    Availability: {
      label: string;
      url: string;
    };
    iCal: string;
  };
}

export interface AirtableBoat {
  id: string;
  capacity: number;
  name: string;
  port: string;
  price: string;
  imported: boolean;
  itemId?: number;
  beamInMeters: number;
  lengthInMeters: number;
  cabins: number;
  type: string;
  crew: number;
  fuelConsumption: number;
  included: string;
  iCal: string;
  boat: string;
}
