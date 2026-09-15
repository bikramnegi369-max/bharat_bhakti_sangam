export interface GalleryItem {
  id: string | number;
  _id?: string;
  src: string;
  imageUrl?: string;
  alt?: string;
  title?: string;
  artistName?: string;
  category?: string;
  location?: string;
  date?: string;
  likes?: number;
  commentsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryItemInput {
  imageUrl: string;
  title: string;
  artistName: string;
  category: string;
  location: string;
  date: string;
  likes: number;
  commentsCount: number;
}

export interface GalleryListResponseData {
  items: GalleryItem[];
  total?: number;
  limit?: number;
  page?: number;
  totalPages?: number;
}
