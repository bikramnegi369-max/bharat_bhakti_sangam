export type BlogAuthor = {
  name: string;
  url?: string;
};

export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
};

export type BlogSeoImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
};

export type BlogSeoRobots = {
  index?: string;
  follow?: string;
  maxSnippet?: string;
  maxImagePreview?: string;
  maxVideoPreview?: string;
};

export type BlogSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: BlogSeoRobots;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    locale?: string;
    type?: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    images?: BlogSeoImage[];
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  schema?: unknown;
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
  seo?: BlogSeo;
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

