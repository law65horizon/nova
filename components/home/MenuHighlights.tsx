import Image from "next/image";
import Link from "next/link";

// Static highlights for the preview — in production these come from Sanity
const highlights = [
  {
    name: "Pineapple Fried Rice",
    description: "Nova's most-requested dish — fragrant rice wok-fried with fresh pineapple, prawns, and seasoned chicken.",
    tag: "House Favourite",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
    imageAlt: "Pineapple fried rice garnished with prawns and fresh herbs",
  },
  {
    name: "Peppered Assorted",
    description: "A bold medley of grilled and peppered meats slow-cooked in Nova's signature pepper sauce.",
    tag: "Chef's Special",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    imageAlt: "Peppered assorted meats in rich sauce",
  },
  {
    name: "Nova Signature Cocktails",
    description: "From tropical fruit blends to classic spirits — our bar team crafts every drink with the same precision as the kitchen.",
    tag: "Bar Picks",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80",
    imageAlt: "Handcrafted cocktails at Nova bar",
  },
];

export default function MenuHighlights() {
  return (
    <section className="py-section bg-surface-container" aria-label="Menu highlights">
      <div className="max-w-site mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="divider-gold" />
              <span className="font-body text-label-caps uppercase tracking-widest text-gold">
                Chef's Selection
              </span>
            </div>
            <h2 className="font-display font-bold text-headline-lg text-midnight">
              Signature Dishes
            </h2>
          </div>
          <Link
            href="/menu"
            className="font-body text-label-caps uppercase tracking-widest text-gold border-b border-gold pb-0.5 hover:opacity-70 transition-opacity whitespace-nowrap self-start sm:self-auto"
          >
            Full Menu →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <article
              key={item.name}
              className="group bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-gold text-midnight font-body text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold">
                    {item.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-headline-sm text-midnight mb-2">
                  {item.name}
                </h3>
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 border border-midnight text-midnight px-8 py-4 font-body text-label-caps uppercase tracking-widest hover:bg-midnight hover:text-ivory transition-colors duration-200"
          >
            Explore the Full Menu
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
