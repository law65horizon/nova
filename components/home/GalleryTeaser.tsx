import Image from "next/image";
import { siteConfig } from "@/lib/config";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    alt: "Nova Restaurant — upscale dining room with ambient lighting and premium table settings",
    className: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&q=80",
    alt: "Elegantly plated main course at Nova",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80",
    alt: "Nova bar with premium cocktails and spirits",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
    alt: "Intimate dinner setting at Nova",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=600&q=80",
    alt: "Dessert presentation at Nova Restaurant",
    className: "",
  },
];

export default function GalleryTeaser() {
  return (
    <section className="py-section px-6 max-w-site mx-auto" aria-label="Nova gallery">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="divider-gold" />
            <span className="font-body text-label-caps uppercase tracking-widest text-gold">
              The Atmosphere
            </span>
          </div>
          <h2 className="font-display font-bold text-headline-lg text-midnight">
            Every Moment, Elevated
          </h2>
        </div>
        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-label-caps uppercase tracking-widest text-gold border-b border-gold pb-0.5 hover:opacity-70 transition-opacity whitespace-nowrap self-start sm:self-auto"
        >
          @thenovarestaurant →
        </a>
      </div>

      <div className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-4 h-[400px] md:h-[500px]">
        {galleryImages.map((img, i) => (
          <div key={i} className={`relative overflow-hidden group ${img.className}`}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-midnight/0 group-hover:bg-midnight/25 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
}
