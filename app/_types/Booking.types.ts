export type Pricing = Record<string, number>;

export type BookingConfig = {
  eventDate: string;
  pricing: Pricing;
};
