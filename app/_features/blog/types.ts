export type BlogAuthor = {
  name: string;
  url?: string;
};

export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
};

export type BlogPostCard = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  modifiedAt: string;
  image?: string;
  imageAlt: string;
  author?: BlogAuthor;
  categories: BlogCategory[];
};

export type BlogPost = BlogPostCard & {
  content: string;
};

export type BlogListResult = {
  posts: BlogPostCard[];
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
};

