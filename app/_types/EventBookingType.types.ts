export interface EventBookingType {
  _id: string;
  bookingType: string;
  price: number;
  subtitle?: string;
  isPopular?: boolean;
  features?: string[];
  isDelete?: boolean;
  isActive?: boolean;
}

