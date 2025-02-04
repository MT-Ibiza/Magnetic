export interface AirtableParams {
  name: string;
  price: number;
  offset: string;
  pageSize: number;
}

export interface AirtableBoatResponse {
  offset: string;
  records: AirtableBoatField[];
}

export interface AirtableBoatField {
  id: string;
  Boat: string;
  Name: string;
  Images: string[];
  Supplier: string;
  Port: string;
  'Length (F)': string;
  Capacity: string;
  Pricing: string;
  Included: string;
  iCal: string;
}
