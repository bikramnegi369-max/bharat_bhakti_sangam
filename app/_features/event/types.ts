export interface LatestEvent {
  _id: string;
  eventName: string;
  description: string;
  venueName?: {
    _id?: string;
    venue?: string;
    address?: string;
  };
  date: string;
  time?: string;
  startTime?: string;
  endTime?: string;
  tabs: string[];
  hashTags: string[];
  bookingType?:
    | {
        name?: string;
        price?: number;
      }
    | {
        name?: string;
        price?: number;
      }[];
  sponsors?: string[];
  artists: Array<
    | string
    | {
        _id?: string;
        name?: string;
        role?: string;
        image?: string;
        about?: string;
      }
  >;
  eventBanner?: string;
  homeBanner?: string;
  ogImage?: string;
  ticketPrice?: number;
  maxSeats?: number;
  availableTickets?: number;
  bookedSeats: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface EventDetail {
  _id: string;
  eventName?: string;
  eventDescription?: string;
  description?: string;
  venueName?:
    | string
    | {
        _id?: string;
        venue?: string;
        address?: string;
      };
  venueId?: string;
  date?: string;
  eventDate?: string;
  time?: string;
  startTime?: string;
  endTime?: string;
  tabs?: string[];
  instruments?: string[];
  hashTags?: string[];
  hashtags?: string[];
  bookingType?: unknown;
  bookingTypes?: unknown;
  sponsors?: unknown;
  artists?: unknown;
  categories?: unknown;
  eventCategories?: unknown;
  maxSeats?: number;
  totalCapacity?: number;
  homeBanner?: string;
  eventBanner?: string;
  ogImage?: string;
  bookedSeats?: number;
  availableTickets?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface Event extends LatestEvent {
  categories: string[];
  artists: Array<{
    _id?: string;
    name?: string;
    role?: string;
    image?: string;
    about?: string;
  }>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
