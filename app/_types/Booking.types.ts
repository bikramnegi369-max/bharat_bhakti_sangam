export type Pricing = Record<string, number>;

export type BookingConfig = {
  eventDate: string;
  pricing: Pricing;
};

export interface BookingCategory {
  _id?: string;
  bookingType: string;
  price: number;
}
