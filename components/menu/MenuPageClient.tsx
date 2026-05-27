"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SanityMenuCategory, SanityMenuItem } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from "@/lib/config";

type Props = {
  categories: SanityMenuCategory[];
};

function MenuItemCard({ item }: { item: SanityMenuItem }) {
  const imageUrl = urlFor(item.image).width(600).height(416).fit("crop").auto("format").url();

  return (
    <article className="group bg-white overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageUrl}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="bg-gold text-midnight font-body text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-headline-sm text-midnight mb-2 leading-snug">
          {item.name}
        </h3>
        <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
          {item.description}
        </p>
        <div className="mt-4 pt-4 border-t border-ivory-dim flex items-center justify-between">
          <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
            ₦ {item.price}
          </span>
          <Link
            href={`/reservations?item=${encodeURIComponent(item.name)}&price=${item.price}`}
            className="font-body text-label-caps uppercase tracking-widest text-gold hover:underline underline-offset-2 transition-all"
            aria-label={`Reserve a table to enjoy ${item.name}`}
          >
            Reserve →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function MenuPageClient({ categories }: Props) {
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?._id ?? ""
  );
  const currentCategory =
    categories.find((c) => c._id === activeCategory) ?? categories[0];

  if (!currentCategory) {
    return (
      <div className="bg-ivory min-h-screen flex items-center justify-center">
        <p className="font-body text-body-lg text-on-surface-variant">
          Menu coming soon.
        </p>
      </div>
    );
  }


  return (
    <div className="bg-ivory min-h-screen">
      {/* Sticky category tabs */}
      <div className="sticky top-16 md:top-20 z-40 bg-ivory/95 backdrop-blur-sm border-b border-ivory-dim shadow-sm">
        <div className="max-w-site mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto scrollbar-none" role="tablist" aria-label="Menu categories">
            {categories.map((cat) => (
              <button
                key={cat._id}
                role="tab"
                aria-selected={activeCategory === cat._id}
                aria-controls={`panel-${cat._id}`}
                onClick={() => setActiveCategory(cat._id)}
                className={`flex-shrink-0 px-6 md:px-10 py-5 font-body text-label-caps uppercase tracking-widest border-b-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset ${
                  activeCategory === cat._id
                    ? "border-gold text-gold"
                    : "border-transparent text-on-surface-variant hover:text-midnight"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category panel */}
      <div id={`panel-${currentCategory._id}`} role="tabpanel" aria-label={currentCategory.name} className="max-w-site mx-auto px-6 py-14">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="divider-gold" />
            <span className="font-body text-label-caps uppercase tracking-widest text-gold">
              {currentCategory.name}
            </span>
          </div>
          <h2 className="font-display font-bold text-headline-md text-midnight mb-3">{currentCategory.name}</h2>
          <p className="font-body text-body-lg text-on-surface-variant max-w-xl">{currentCategory.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.items.map((item) => (
            <MenuItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom CTA strip */}
      <div className="bg-midnight py-14 px-6 mt-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #C9A84C, transparent 50%)" }}
        />
        <div className="max-w-site mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="divider-gold" />
              <span className="font-body text-label-caps uppercase tracking-widest text-gold">
                Ready to Dine?
              </span>
            </div>
            <h2 className="font-display font-bold text-headline-sm text-ivory mb-1">Reserve Your Table</h2>
            <p className="font-body text-body-md text-ivory/60">
              Book online or call us directly. Family packages available on request.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/reservations"
              className="inline-flex items-center gap-2 bg-gold text-midnight px-7 py-3.5 font-body text-label-caps uppercase tracking-widest font-semibold hover:bg-gold-light transition-colors duration-200 justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Reserve a Table
            </Link>
            {siteConfig.phones.slice(0, 1).map((phone) => (
              <a
                key={phone.number}
                href={`tel:+234${phone.number.replace(/^0/, "")}`}
                className="inline-flex items-center gap-2 border border-ivory/20 text-ivory px-7 py-3.5 font-body text-label-caps uppercase tracking-widest hover:border-ivory/60 transition-colors duration-200 justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.12.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.56 2.81.68A2 2 0 0122 16.92z" />
                </svg>
                Call Us
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}