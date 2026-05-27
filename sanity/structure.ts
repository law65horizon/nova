import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Menu Categories")
        .child(S.documentTypeList("menuCategory").title("Menu Categories")),
      S.listItem()
        .title("Menu Items")
        .child(S.documentTypeList("menuItem").title("Menu Items")),
    ])
