export interface BookEvent {
  id: number;
  from: Date;
  to: Date;
  text?: string;
  type: string;
  taken: boolean;
  createdAt: Date;
  updatedAt: Date;
}
