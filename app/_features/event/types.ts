export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
}

export interface LatestEvent {
  _id: string;
  eventName: string;
  description: string;
  venueName?:
    | string
    | {
        venue?: string;
        address?: string;
      };
  date: string;
  time: string;
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
  bannerImage?: string;
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
