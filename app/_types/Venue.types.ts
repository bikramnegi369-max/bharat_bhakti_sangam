export interface Venue {
  _id: string;
  venue: string;
  address: string;
  image: string;
  city?: string;
  isActive?: boolean;
  events: number;
}
