"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  title: "Nova Restaurant",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Reservations")
              .child(S.documentTypeList("reservation").title("Reservations")),
            S.listItem()
              .title("Menu Categories")
              .child(S.documentTypeList("menuCategory").title("Menu Categories")),
            S.listItem()
              .title("Menu Items")
              .child(S.documentTypeList("menuItem").title("Menu Items")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
