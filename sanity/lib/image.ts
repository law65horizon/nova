import imageUrlBuilder from "@sanity/image-url";
// import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url/signed";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
