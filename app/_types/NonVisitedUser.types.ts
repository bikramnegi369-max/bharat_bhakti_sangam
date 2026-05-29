export interface NonVisitedUser {
  _id: string;
  email: string;
  name: string;
  tickets: number;
  visitUsers: number;
  nonVisitCount: number;
  eventName: string;
  ticketId: string;
  contact: number;
  bookingDate: string;
}
