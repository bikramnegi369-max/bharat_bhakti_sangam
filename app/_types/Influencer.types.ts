export interface InfluencerAddress {
  city: string;
  state: string;
  pincode: string;
}

export interface InfluencerSocialLinks {
  instagram?: string;
  youtube?: string;
  facebook?: string;
}

export interface InfluencerRequest {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: "male" | "female" | "other";
  address: InfluencerAddress;
  profilePicture: string;
  socialLinks?: InfluencerSocialLinks;
  status?: "pending" | "approved" | "rejected" | string;
  createdAt?: string;
  updatedAt?: string;
}
