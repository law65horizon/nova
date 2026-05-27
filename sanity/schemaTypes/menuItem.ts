import { defineField, defineType } from "sanity";

const TAG_OPTIONS = [
  { title: "Popular", value: "POPULAR" },
  { title: "Signature", value: "SIGNATURE" },
  { title: "Spicy", value: "SPICY" },
  { title: "Classic", value: "CLASSIC" },
  { title: "Traditional", value: "TRADITIONAL" },
  { title: "Grilled", value: "GRILLED" },
  { title: "Local Favourite", value: "LOCAL FAVOURITE" },
  { title: "Luxury", value: "LUXURY" },
  { title: "No Alcohol", value: "NO-ALCOHOL" },
  { title: "Curated", value: "CURATED" },
];

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "menuCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
      description: "Describe the image for screen readers and SEO",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Menu Price",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { list: TAG_OPTIONS },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this item in the homepage highlights section",
      initialValue: false,
    }),
    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
      description: "Uncheck to hide this item from the menu without deleting it",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first within the category",
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Name A–Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category.name",
      media: "image",
      price: "price"
    },
  },
});
