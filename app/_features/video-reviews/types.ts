export interface VideoReviewItem {
  id: string | number;
  _id?: string;
  title: string;
  reviewerName?: string;
  location: string;
  rating: number;
  highlightVideoSrc: string;
  posterSrc?: string;
  videoSrc: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VideoReviewItemInput {
  title: string;
  reviewerName?: string;
  location: string;
  rating: number;
  highlightVideoSrc: string;
  posterSrc?: string;
  videoSrc: string;
}

export interface VideoReviewListResponseData {
  items: VideoReviewItem[];
  total?: number;
  limit?: number;
  page?: number;
  totalPages?: number;
}
