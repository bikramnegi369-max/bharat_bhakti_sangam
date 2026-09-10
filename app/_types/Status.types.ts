export interface StatusItem {
  _id: string;
  videoUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  downloadsCount: number;
  createdAt: string;
  updatedAt: string;
}

export type StatusSortOption = "latest" | "popular" | "downloads" | "oldest";

export interface StatusQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
  sortBy?: StatusSortOption;
  order?: "asc" | "desc";
}

export interface StatusListResponseData {
  items: StatusItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
