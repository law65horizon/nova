/**
 * Seed script — populates Sanity with the initial menu data.
 *
 * Prerequisites:
 *   1. Create a .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 *   2. The SANITY_API_TOKEN must have Editor permissions (not Viewer)
 *
 * Run:
 *   npx tsx scripts/seed-sanity.ts
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ── Category seed data ────────────────────────────────────────────────────────

const categories = [
  { _id: "category-food",  name: "Food",           slug: "food",   description: "Authentic Nigerian flavours crafted with heritage spices and premium ingredients.", order: 1 },
  { _id: "category-drinks",name: "Drinks",          slug: "drinks", description: "From freshly squeezed juices to handcrafted cocktails and classic sodas.", order: 2 },
  { _id: "category-wine",  name: "Wine & Winery",  slug: "wine",   description: "A curated cellar of Old World and New World wines, champagnes, and premium spirits.", order: 3 },
];

// ── Item seed data ────────────────────────────────────────────────────────────
// Images are Unsplash URLs. After seeding, the admin can replace them with
// actual restaurant photos via the Sanity Studio image uploader.

type SeedItem = {
  _id: string;
  name: string;
  categoryId: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  featured: boolean;
  available: boolean;
  order: number;
};

const items: SeedItem[] = [
  // Food
  { _id: "item-jollof-rice",      name: "Royal Jollof Rice",        categoryId: "category-food",   description: "Slow-cooked party jollof infused with heritage spices, served with grilled protein of choice and fried plantain.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80", imageAlt: "Nigerian Jollof rice garnished with fried plantain and grilled chicken", tags: ["POPULAR","SIGNATURE"], featured: true,  available: true, order: 1 },
  { _id: "item-pepper-soup",      name: "Catfish Pepper Soup",      categoryId: "category-food",   description: "A bold, aromatic broth simmered with fresh point-and-kill catfish, uziza leaves, and warming spices.", imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80", imageAlt: "Spiced catfish pepper soup in a clay bowl with fresh herbs", tags: ["SPICY","SIGNATURE"], featured: true,  available: true, order: 2 },
  { _id: "item-pounded-yam",      name: "Pounded Yam & Egusi",      categoryId: "category-food",   description: "Silky pounded yam served with rich egusi soup slow-cooked with assorted meat, dried fish, and bitter leaf.", imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80", imageAlt: "Smooth pounded yam paired with rich egusi soup and assorted meat", tags: ["CLASSIC"], featured: true,  available: true, order: 3 },
  { _id: "item-suya",             name: "Suya Platter",             categoryId: "category-food",   description: "Northern-style skewered beef or chicken marinated in spiced yaji, grilled over open flame, served with onions and tomatoes.", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80", imageAlt: "Grilled suya skewers on a platter with sliced onions and tomatoes", tags: ["SPICY","POPULAR"], featured: true,  available: true, order: 4 },
  { _id: "item-grilled-fish",     name: "Grilled Tilapia",          categoryId: "category-food",   description: "Whole fresh tilapia marinated in our signature pepper blend, charcoal grilled to perfection, served with fried yam.", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80", imageAlt: "Whole grilled tilapia with pepper marinade served with fried yam", tags: ["GRILLED"], featured: false, available: true, order: 5 },
  { _id: "item-bitter-leaf",      name: "Bitter Leaf Soup",         categoryId: "category-food",   description: "A rich Igbo classic — thick, hearty soup made with cocoyam, assorted meats, and palm oil.", imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80", imageAlt: "Bitter leaf soup with assorted meat in traditional bowl", tags: ["TRADITIONAL"], featured: false, available: true, order: 6 },
  { _id: "item-fried-rice",       name: "Kinqsville Fried Rice",    categoryId: "category-food",   description: "Our house fried rice tossed with mixed vegetables, shrimp, chicken liver, and a drizzle of oyster sauce.", imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80", imageAlt: "Nigerian fried rice with vegetables, shrimp and chicken", tags: ["POPULAR"], featured: false, available: true, order: 7 },
  { _id: "item-banga-soup",       name: "Banga Soup & Starch",      categoryId: "category-food",   description: "A Delta State delicacy — palm nut extract cooked down with beletete spice and served with starch.", imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80", imageAlt: "Banga palm nut soup served with white starch — Delta State delicacy", tags: ["LOCAL FAVOURITE"], featured: false, available: true, order: 8 },
  { _id: "item-chicken-wings",    name: "Peri-Peri Chicken Wings",  categoryId: "category-food",   description: "Crispy wings coated in a fiery house-made peri-peri glaze, served with a cooling garlic dip.", imageUrl: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80", imageAlt: "Crispy peri-peri chicken wings with garlic dip on a wooden board", tags: ["SPICY"], featured: false, available: true, order: 9 },
  // Drinks
  { _id: "item-chapman",          name: "Classic Chapman",          categoryId: "category-drinks", description: "Nigeria's beloved cocktail — Fanta, Sprite, cucumber, cherries, and bitters over crushed ice.", imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80", imageAlt: "Vibrant Chapman cocktail with cucumber slices, cherries and crushed ice", tags: ["POPULAR","NO-ALCOHOL"], featured: true,  available: true, order: 1 },
  { _id: "item-zobo",             name: "Premium Zobo",             categoryId: "category-drinks", description: "Hibiscus flower drink brewed with ginger, cloves, and pineapple. Served chilled.", imageUrl: "https://images.unsplash.com/photo-1560508180-03f285f67ded?w=600&q=80", imageAlt: "Chilled zobo hibiscus drink in a tall glass with ice", tags: ["SIGNATURE","NO-ALCOHOL"], featured: true,  available: true, order: 2 },
  { _id: "item-cocktails",        name: "Signature Cocktails",      categoryId: "category-drinks", description: "Crafted by our mixologists — rotating seasonal cocktails using premium spirits and fresh Nigerian botanicals.", imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80", imageAlt: "Elegant handcrafted cocktails with garnish and vibrant colours", tags: ["SIGNATURE"], featured: true,  available: true, order: 3 },
  { _id: "item-fresh-juice",      name: "Fresh-Pressed Juices",     categoryId: "category-drinks", description: "Watermelon, pineapple-ginger, tiger nut, and seasonal blends. Cold-pressed daily.", imageUrl: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80", imageAlt: "Colourful fresh-pressed fruit juices in tall glasses", tags: ["NO-ALCOHOL"], featured: false, available: true, order: 4 },
  { _id: "item-palm-wine",        name: "Tapped Palm Wine",         categoryId: "category-drinks", description: "Freshly tapped undiluted palm wine served in a chilled calabash or glass.", imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80", imageAlt: "Fresh palm wine in a traditional calabash with green palm fronds", tags: ["TRADITIONAL","POPULAR"], featured: false, available: true, order: 5 },
  { _id: "item-mocktails",        name: "Mocktails & Smoothies",    categoryId: "category-drinks", description: "Virgin mojitos, berry blasts, and tropical smoothies.", imageUrl: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&q=80", imageAlt: "Tropical mocktail with fresh fruit garnish in a crystal glass", tags: ["NO-ALCOHOL"], featured: false, available: true, order: 6 },
  // Wine
  { _id: "item-red-wine",         name: "Premium Red Wines",        categoryId: "category-wine",   description: "Cabernet Sauvignon, Merlot, and Shiraz selections from South Africa, France, and Italy.", imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80", imageAlt: "Deep red wine being poured into a crystal glass by candlelight", tags: ["CURATED"], featured: true,  available: true, order: 1 },
  { _id: "item-white-wine",       name: "White & Rosé Wines",       categoryId: "category-wine",   description: "Crisp Chardonnay, Sauvignon Blanc, and blush Rosé — perfectly chilled.", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", imageAlt: "Chilled white wine in elegant glass with vineyard background", tags: ["CURATED"], featured: true,  available: true, order: 2 },
  { _id: "item-champagne",        name: "Champagne & Sparkling",    categoryId: "category-wine",   description: "Moët & Chandon, Veuve Clicquot, and Prosecco. Perfect for every milestone.", imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80", imageAlt: "Champagne bottle being uncorked with sparkling bubbles", tags: ["LUXURY","POPULAR"], featured: true,  available: true, order: 3 },
  { _id: "item-whisky",           name: "Premium Whisky & Cognac",  categoryId: "category-wine",   description: "Single malts, blended Scotch, Bourbon, and XO Cognac.", imageUrl: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&q=80", imageAlt: "Premium whisky poured over ice in a crystal tumbler", tags: ["LUXURY"], featured: false, available: true, order: 4 },
  { _id: "item-sangria",          name: "Wine Cocktails & Sangria", categoryId: "category-wine",   description: "Refreshing sangria and house wine cocktails.", imageUrl: "https://images.unsplash.com/photo-1567696911980-2c669aff5b3e?w=600&q=80", imageAlt: "Red and white sangria in a large pitcher with fresh fruit slices", tags: ["POPULAR"], featured: false, available: true, order: 5 },
  { _id: "item-spirits",          name: "Premium Spirits & Liqueurs",categoryId: "category-wine",  description: "Vodka, Gin, Rum, Tequila from top global distilleries. Over 40 premium spirit labels.", imageUrl: "https://images.unsplash.com/photo-1533622597524-a1215e26c0a2?w=600&q=80", imageAlt: "Assortment of premium spirit bottles illuminated behind a bar", tags: ["CURATED"], featured: false, available: true, order: 6 },
];

// ── Seed ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Seeding Sanity dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production");

  // 1. Upsert categories
  for (const cat of categories) {
    await client.createOrReplace({
      _type: "menuCategory",
      _id: cat._id,
      name: cat.name,
      slug: { _type: "slug", current: cat.slug },
      description: cat.description,
      order: cat.order,
    });
    console.log(`  ✓ Category: ${cat.name}`);
  }

  // 2. Upsert items
  // NOTE: images are referenced by Unsplash URLs as external image sources.
  // Replace them with real photos via Studio → Menu Items → [item] → Image.
  for (const item of items) {
    await client.createOrReplace({
      _type: "menuItem",
      _id: item._id,
      name: item.name,
      category: { _type: "reference", _ref: item.categoryId },
      description: item.description,
      // External URL images can't be stored as Sanity assets via the API
      // without uploading. We store a placeholder so the document exists.
      // The admin must upload the actual image via Studio.
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: "image-placeholder" },
      },
      imageAlt: item.imageAlt,
      tags: item.tags,
      featured: item.featured,
      available: item.available,
      order: item.order,
    });
    console.log(`  ✓ Item: ${item.name}`);
  }

  console.log("\n✅ Seed complete.");
  console.log("⚠️  Images are placeholders — upload real photos via /studio for each menu item.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
