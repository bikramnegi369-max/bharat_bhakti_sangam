export interface Artist {
  _id: string;
  artistName: string;
  profileImage: string;
  email: string;
  contactNo: string;
  instruments: string[];
  startTime: string;
  endTime: string;
  galleryImages?: string[];
  aboutArtist: string;
  isActive: boolean;
}
