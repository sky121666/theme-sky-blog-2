export type HaloPageType = "index" | "categories" | "category" | "tags" | "tag" | "post" | "unknown";

export interface HaloMetadata {
  creationTimestamp?: string | null;
  name?: string | null;
}

export interface HaloStatus {
  permalink?: string | null;
}

export interface HaloTaxonomySpec {
  displayName?: string | null;
  slug?: string | null;
}

export interface HaloPostSpec {
  owner?: string | null;
  publishTime?: string | null;
  slug?: string | null;
  title?: string | null;
}

export interface HaloTaxonomyRecord {
  metadata?: HaloMetadata;
  postCount?: number | null;
  spec?: HaloTaxonomySpec;
  status?: HaloStatus;
}

export interface HaloPostRecord {
  metadata?: HaloMetadata;
  spec?: HaloPostSpec;
  status?: HaloStatus;
}

export interface HaloCurrentRef {
  displayName?: string | null;
  permalink?: string | null;
  slug?: string | null;
  title?: string | null;
}

export interface HaloPagination {
  hasNext: boolean;
  hasPrev: boolean;
  nextUrl: string | null;
  prevUrl: string | null;
}

export interface HaloUrls {
  archives: string;
  categories: string;
  home: string;
  tags: string;
}

export interface HaloPageDataPayload {
  categories: HaloTaxonomyRecord[];
  currentCategory?: HaloCurrentRef | null;
  currentPost?: HaloCurrentRef | null;
  currentPosts: HaloPostRecord[];
  currentTag?: HaloCurrentRef | null;
  nextPost?: string | null;
  pageType: HaloPageType;
  pagination?: HaloPagination;
  prevPost?: string | null;
  tags: HaloTaxonomyRecord[];
  user: string;
}

export interface HaloData extends HaloPageDataPayload {
  homePosts: HaloPostRecord[];
  urls: HaloUrls;
}

export interface DirectoryEntry {
  count?: number;
  date?: string | null;
  name: string;
  permalink?: string | null;
  slug?: string | null;
  type: "dir" | "file";
}

declare global {
  interface Window {
    Alpine: unknown;
    haloData?: HaloData;
  }
}

export {};
