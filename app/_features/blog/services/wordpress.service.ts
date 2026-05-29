import "server-only";

import type {
  BlogAuthor,
  BlogCategory,
  BlogListResult,
  BlogPost,
  BlogPostCard,
} from "../types";

const DEFAULT_REVALIDATE_SECONDS = 300;
const DEFAULT_PER_PAGE = 9;
const MAX_PER_PAGE = 24;
const POSTS_PATH = "/wp/v2/posts";

type WordpressRendered = {
  rendered?: string;
};

type WordpressAuthor = {
  name?: string;
  url?: string;
};

type WordpressMedia = {
  source_url?: string;
  alt_text?: string;
  media_details?: {
    sizes?: Record<string, { source_url?: string }>;
  };
};

type WordpressTerm = {
  id?: number;
  name?: string;
  slug?: string;
  taxonomy?: string;
};

type WordpressPost = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title?: WordpressRendered;
  excerpt?: WordpressRendered;
  content?: WordpressRendered;
  _embedded?: {
    author?: WordpressAuthor[];
    "wp:featuredmedia"?: WordpressMedia[];
    "wp:term"?: WordpressTerm[][];
  };
};

class WordpressApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "WordpressApiError";
  }
}

function getWordpressApiBaseUrl() {
  const baseUrl =
    process.env.WORDPRESS_API_URL ?? process.env.NEXT_PUBLIC_WORDPRESS_API;

  if (!baseUrl) {
    throw new WordpressApiError("Missing WordPress API URL.");
  }

  return baseUrl.replace(/\/$/, "");
}

function getPostsUrl(path = POSTS_PATH) {
  return new URL(`${getWordpressApiBaseUrl()}${path}`);
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "-");
}

function stripHtml(html?: string) {
  return decodeHtmlEntities(
    (html ?? "")
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function cleanWordpressHtml(html?: string) {
  return (html ?? "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .trim();
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}...`;
}

function getFeaturedImage(media?: WordpressMedia) {
  if (!media) return undefined;

  return (
    media.media_details?.sizes?.large?.source_url ??
    media.media_details?.sizes?.medium_large?.source_url ??
    media.source_url
  );
}

function getAuthor(post: WordpressPost): BlogAuthor | undefined {
  const author = post._embedded?.author?.[0];
  if (!author?.name) return undefined;

  return {
    name: decodeHtmlEntities(author.name),
    url: author.url,
  };
}

function getCategories(post: WordpressPost): BlogCategory[] {
  return (
    post._embedded?.["wp:term"]
      ?.flat()
      .filter((term) => term.taxonomy === "category")
      .map((term) => ({
        id: term.id ?? 0,
        name: decodeHtmlEntities(term.name ?? "Uncategorized"),
        slug: term.slug ?? "uncategorized",
      })) ?? []
  );
}

function normalizePostCard(post: WordpressPost): BlogPostCard {
  const title = stripHtml(post.title?.rendered) || "Untitled";
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];

  return {
    id: post.id,
    slug: post.slug,
    title,
    excerpt: truncate(stripHtml(post.excerpt?.rendered), 180),
    publishedAt: post.date,
    modifiedAt: post.modified,
    image: getFeaturedImage(featuredMedia),
    imageAlt: stripHtml(featuredMedia?.alt_text) || title,
    author: getAuthor(post),
    categories: getCategories(post),
  };
}

function normalizePost(post: WordpressPost): BlogPost {
  return {
    ...normalizePostCard(post),
    content: cleanWordpressHtml(post.content?.rendered),
  };
}

function toPositiveInteger(
  value: number | string | undefined,
  fallback: number,
) {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue) || numberValue < 1) return fallback;
  return Math.floor(numberValue);
}

async function fetchWordpress<T>(url: URL): Promise<{
  data: T;
  headers: Headers;
}> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
    },
  });

  if (!response.ok) {
    throw new WordpressApiError(
      `WordPress request failed with status ${response.status}.`,
      response.status,
    );
  }

  return {
    data: (await response.json()) as T,
    headers: response.headers,
  };
}

export async function getBlogPosts({
  page = 1,
  perPage = DEFAULT_PER_PAGE,
  search,
}: {
  page?: number | string;
  perPage?: number | string;
  search?: string;
} = {}): Promise<BlogListResult> {
  const safePage = toPositiveInteger(page, 1);
  const safePerPage = Math.min(
    toPositiveInteger(perPage, DEFAULT_PER_PAGE),
    MAX_PER_PAGE,
  );
  const url = getPostsUrl();

  url.searchParams.set("_embed", "1");
  url.searchParams.set("page", String(safePage));
  url.searchParams.set("per_page", String(safePerPage));
  url.searchParams.set("orderby", "date");
  url.searchParams.set("order", "desc");

  if (search?.trim()) {
    url.searchParams.set("search", search.trim());
  }

  try {
    const { data, headers } = await fetchWordpress<WordpressPost[]>(url);
    const total = Number(headers.get("x-wp-total") ?? data.length);
    const totalPages = Number(headers.get("x-wp-totalpages") ?? 1);

    return {
      posts: data.map(normalizePostCard),
      total: Number.isFinite(total) ? total : data.length,
      totalPages: Number.isFinite(totalPages) ? totalPages : 1,
      page: safePage,
      perPage: safePerPage,
    };
  } catch (error) {
    if (error instanceof WordpressApiError && error.status === 400) {
      return {
        posts: [],
        total: 0,
        totalPages: 0,
        page: safePage,
        perPage: safePerPage,
      };
    }

    throw error;
  }
}

export async function getBlogPostBySlug(slug: string) {
  const url = getPostsUrl();

  url.searchParams.set("_embed", "1");
  url.searchParams.set("slug", slug);
  url.searchParams.set("per_page", "1");

  const { data } = await fetchWordpress<WordpressPost[]>(url);
  const post = data[0];

  return post ? normalizePost(post) : null;
}

export async function getLatestBlogPostSlugs(limit = 20) {
  const url = getPostsUrl();

  url.searchParams.set("per_page", String(Math.min(limit, 100)));
  url.searchParams.set("_fields", "slug");

  const { data } =
    await fetchWordpress<Array<Pick<WordpressPost, "slug">>>(url);

  return data.map((post) => post.slug);
}
