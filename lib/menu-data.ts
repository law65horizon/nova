export type MenuItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  tags?: string[];
  featured?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "food",
    name: "Food",
    slug: "food",
    description:
      "Authentic Nigerian flavours crafted with heritage spices and premium ingredients.",
    items: [
      {
        id: "jollof-rice",
        name: "Royal Jollof Rice",
        description:
          "Slow-cooked party jollof infused with heritage spices, served with grilled protein of choice and fried plantain.",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
        imageAlt: "Nigerian Jollof rice garnished with fried plantain and grilled chicken",
        tags: ["POPULAR", "SIGNATURE"],
        featured: true,
      },
      {
        id: "pepper-soup",
        name: "Catfish Pepper Soup",
        description:
          "A bold, aromatic broth simmered with fresh point-and-kill catfish, uziza leaves, and warming spices.",
        image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
        imageAlt: "Spiced catfish pepper soup in a clay bowl with fresh herbs",
        tags: ["SPICY", "SIGNATURE"],
        featured: true,
      },
      {
        id: "pounded-yam-egusi",
        name: "Pounded Yam & Egusi",
        description:
          "Silky pounded yam served with rich egusi soup slow-cooked with assorted meat, dried fish, and bitter leaf.",
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
        imageAlt: "Smooth pounded yam paired with rich egusi soup and assorted meat",
        tags: ["CLASSIC"],
        featured: true,
      },
      {
        id: "suya",
        name: "Suya Platter",
        description:
          "Northern-style skewered beef or chicken marinated in spiced yaji, grilled over open flame, served with onions and tomatoes.",
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
        imageAlt: "Grilled suya skewers on a platter with sliced onions and tomatoes",
        tags: ["SPICY", "POPULAR"],
        featured: true,
      },
      {
        id: "grilled-fish",
        name: "Grilled Tilapia",
        description:
          "Whole fresh tilapia marinated in our signature pepper blend, charcoal grilled to perfection, served with fried yam.",
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
        imageAlt: "Whole grilled tilapia with pepper marinade served with fried yam",
        tags: ["GRILLED"],
      },
      {
        id: "ofe-onugbu",
        name: "Bitter Leaf Soup",
        description:
          "A rich Igbo classic — thick, hearty soup made with cocoyam, assorted meats, and palm oil.",
        image:
          "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
        imageAlt: "Bitter leaf soup with assorted meat in traditional bowl",
        tags: ["TRADITIONAL"],
      },
      {
        id: "fried-rice",
        name: "Kinqsville Fried Rice",
        description:
          "Our house fried rice tossed with mixed vegetables, shrimp, chicken liver, and a drizzle of oyster sauce.",
        image:
          "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
        imageAlt: "Nigerian fried rice with vegetables, shrimp and chicken",
        tags: ["POPULAR"],
      },
      {
        id: "ofe-akwu",
        name: "Banga Soup & Starch",
        description:
          "A Delta State delicacy — palm nut extract cooked down with beletete spice and served with starch.",
        image:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80",
        imageAlt: "Banga palm nut soup served with white starch — Delta State delicacy",
        tags: ["LOCAL FAVOURITE"],
      },
      {
        id: "chicken-wings",
        name: "Peri-Peri Chicken Wings",
        description:
          "Crispy wings coated in a fiery house-made peri-peri glaze, served with a cooling garlic dip.",
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80",
        imageAlt: "Crispy peri-peri chicken wings with garlic dip on a wooden board",
        tags: ["SPICY"],
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    slug: "drinks",
    description:
      "From freshly squeezed juices to handcrafted cocktails and classic sodas.",
    items: [
      {
        id: "chapman",
        name: "Classic Chapman",
        description:
          "Nigeria's beloved cocktail — Fanta, Sprite, cucumber, cherries, and bitters over crushed ice. Party in a glass.",
        image:
          "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80",
        imageAlt: "Vibrant Chapman cocktail with cucumber slices, cherries and crushed ice",
        tags: ["POPULAR", "NO-ALCOHOL"],
        featured: true,
      },
      {
        id: "zobo",
        name: "Premium Zobo",
        description:
          "Hibiscus flower drink brewed with ginger, cloves, and pineapple. Served chilled with or without a spirit kick.",
        image:
          "https://images.unsplash.com/photo-1560508180-03f285f67ded?w=600&q=80",
        imageAlt: "Chilled zobo hibiscus drink in a tall glass with ice",
        tags: ["SIGNATURE", "NO-ALCOHOL"],
        featured: true,
      },
      {
        id: "cocktails",
        name: "Signature Cocktails",
        description:
          "Crafted by our mixologists — rotating seasonal cocktails using premium spirits and fresh Nigerian botanicals.",
        image:
          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80",
        imageAlt: "Elegant handcrafted cocktails with garnish and vibrant colours",
        tags: ["SIGNATURE"],
        featured: true,
      },
      {
        id: "fresh-juice",
        name: "Fresh-Pressed Juices",
        description:
          "Watermelon, pineapple-ginger, tiger nut, and seasonal blends. Cold-pressed daily for maximum flavour.",
        image:
          "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80",
        imageAlt: "Colourful fresh-pressed fruit juices in tall glasses",
        tags: ["NO-ALCOHOL"],
      },
      {
        id: "palm-wine",
        name: "Tapped Palm Wine",
        description:
          "Freshly tapped undiluted palm wine served in a chilled calabash or glass. The quintessential Nigerian refresher.",
        image:
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80",
        imageAlt: "Fresh palm wine in a traditional calabash with green palm fronds",
        tags: ["TRADITIONAL", "POPULAR"],
      },
      {
        id: "mocktails",
        name: "Mocktails & Smoothies",
        description:
          "Virgin mojitos, berry blasts, and tropical smoothies. Refreshing sips for everyone at the table.",
        image:
          "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&q=80",
        imageAlt: "Tropical mocktail with fresh fruit garnish in a crystal glass",
        tags: ["NO-ALCOHOL"],
      },
    ],
  },
  {
    id: "wine",
    name: "Wine & Winery",
    slug: "wine",
    description:
      "A curated cellar of Old World and New World wines, champagnes, and premium spirits.",
    items: [
      {
        id: "red-wine",
        name: "Premium Red Wines",
        description:
          "Cabernet Sauvignon, Merlot, and Shiraz selections from South Africa, France, and Italy. Ask our sommelier for pairing advice.",
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80",
        imageAlt: "Deep red wine being poured into a crystal glass by candlelight",
        tags: ["CURATED"],
        featured: true,
      },
      {
        id: "white-wine",
        name: "White & Rosé Wines",
        description:
          "Crisp Chardonnay, Sauvignon Blanc, and blush Rosé — perfectly chilled and perfectly matched to our seafood dishes.",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        imageAlt: "Chilled white wine in elegant glass with vineyard background",
        tags: ["CURATED"],
        featured: true,
      },
      {
        id: "champagne",
        name: "Champagne & Sparkling",
        description:
          "Celebrate in style with our Moët & Chandon, Veuve Clicquot, and Prosecco selections. Perfect for every milestone.",
        image:
          "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
        imageAlt: "Champagne bottle being uncorked with sparkling bubbles",
        tags: ["LUXURY", "POPULAR"],
        featured: true,
      },
      {
        id: "whisky",
        name: "Premium Whisky & Cognac",
        description:
          "Single malts, blended Scotch, Bourbon, and XO Cognac. Our spirit collection is curated for the discerning palate.",
        image:
          "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&q=80",
        imageAlt: "Premium whisky poured over ice in a crystal tumbler",
        tags: ["LUXURY"],
      },
      {
        id: "wine-cocktails",
        name: "Wine Cocktails & Sangria",
        description:
          "Refreshing sangria and house wine cocktails. The perfect bridge between wine lovers and cocktail enthusiasts.",
        image:
          "https://images.unsplash.com/photo-1567696911980-2c669aff5b3e?w=600&q=80",
        imageAlt: "Red and white sangria in a large pitcher with fresh fruit slices",
        tags: ["POPULAR"],
      },
      {
        id: "spirits",
        name: "Premium Spirits & Liqueurs",
        description:
          "Vodka, Gin, Rum, Tequila from top global distilleries. Our bar stocks over 40 premium spirit labels.",
        image:
          "https://images.unsplash.com/photo-1533622597524-a1215e26c0a2?w=600&q=80",
        imageAlt: "Assortment of premium spirit bottles illuminated behind a bar",
        tags: ["CURATED"],
      },
    ],
  },
];

export const featuredItems = menuCategories
  .flatMap((c) => c.items.filter((i) => i.featured))
  .slice(0, 6);
