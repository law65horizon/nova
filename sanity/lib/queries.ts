import { client } from "./client";

// ── Types ────────────────────────────────────────────────────────────────────

export type SanityImage = {
  asset: { _ref: string };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type SanityMenuItem = {
  _id: string;
  name: string;
  description: string;
  image: SanityImage;
  imageAlt: string;
  tags?: string[];
  featured: boolean;
  available: boolean;
  order?: number;
  price: number
};

export type SanityMenuCategory = {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  order: number;
  items: SanityMenuItem[];
};

// ── Queries ──────────────────────────────────────────────────────────────────

// All categories with their available items, sorted by display order
const MENU_CATEGORIES_QUERY = `
  *[_type == "menuCategory"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    order,
    "items": *[_type == "menuItem" && references(^._id) && available == true] | order(order asc) {
      _id,
      name,
      description,
      image,
      imageAlt,
      price,
      tags,
      featured,
      available,
      order
    }
  }
`;

// Featured items across all categories for the homepage highlights section
const FEATURED_ITEMS_QUERY = `
  *[_type == "menuItem" && featured == true && available == true] | order(_createdAt desc) [0..5] {
    _id,
    name,
    description,
    image,
    imageAlt,
    price,
    tags,
    featured,
    available,
    _createdAt,
    "categoryName": category->name
  }
`;

// ── Fetch functions ───────────────────────────────────────────────────────────

export async function getMenuCategories(): Promise<SanityMenuCategory[]> {
  return client.fetch(MENU_CATEGORIES_QUERY, {}, { next: { revalidate: 60 } });
}

export async function getFeaturedItems(): Promise<SanityMenuItem[]> {
  return client.fetch(FEATURED_ITEMS_QUERY, {}, { next: { revalidate: 60 } });
}
