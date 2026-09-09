export interface ArtistAddress {
  city?: string;
  state?: string;
  pincode?: string;
}

export interface ArtistSocialLinks {
  instagram?: string;
  youtube?: string;
  facebook?: string;
}

export interface Artist {
  _id: string;
  artistName: string;
  role: string;
  profileImage: string;
  aboutArtist: string;
  email: string;
  contactNo: string;
  gender?: "male" | "female" | "other" | string;
  address?: ArtistAddress;
  socialLinks?: ArtistSocialLinks;
  instruments?: string[];
  startTime?: string;
  endTime?: string;
  galleryImages?: string[];
  status?: "pending" | "approved" | "rejected" | string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
