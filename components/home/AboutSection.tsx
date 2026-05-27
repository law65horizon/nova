import Image from "next/image";

const pillars = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    label: "Premium Cuisine",
    description: "Contemporary Nigerian and international dishes crafted with seasonal, locally-sourced ingredients.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M9 18V5l12-2v13M9 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/>
      </svg>
    ),
    label: "Live Music Nights",
    description: "Fridays and Saturdays come alive with curated live performances — from Afrobeats to jazz.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    label: "Family Packages",
    description: "Lavish family platters that feed up to 5 — Nova's most celebrated offering and best value.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-section px-6 max-w-site mx-auto" aria-label="About Nova">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Image column */}
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80"
              alt="Nova Restaurant — elegantly plated contemporary Nigerian cuisine with premium presentation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Accent stat card */}
          <div className="absolute -bottom-6 -right-4 md:-right-6 bg-midnight p-6 md:p-8 text-ivory max-w-[200px] shadow-2xl border-l-2 border-gold">
            <p className="font-display font-bold text-4xl text-gold">GRA</p>
            <p className="font-body text-label-caps uppercase tracking-widest text-ivory/60 mt-2">
              Phase I · Asaba's Premium District
            </p>
          </div>

          {/* Gold corner */}
          <div className="absolute -top-4 -left-4 w-16 h-16 border-t border-l border-gold/50" aria-hidden="true" />
        </div>

        {/* Text column */}
        <div className="order-1 lg:order-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="divider-gold" />
            <span className="font-body text-label-caps uppercase tracking-widest text-gold">
              Our Story
            </span>
          </div>
          <h2 className="font-display font-bold text-headline-lg text-midnight mb-6">
            Upscale Dining in the Heart of Asaba's Finest Quarter
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-5 leading-relaxed">
            Nestled opposite the Legislative Quarters on Okpanam Road, Nova is
            where Asaba's discerning professionals, families, and creatives come
            to unwind. We've built a space that feels both elevated and
            effortlessly welcoming.
          </p>
          <p className="text-body-md text-on-surface-variant mb-10 leading-relaxed">
            From our celebrated pineapple fried rice to our curated cocktail bar,
            every detail at Nova is intentional. Our family packages have become
            a local favourite — generous platters designed to bring people
            together without compromise.
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.label} className="border-t border-ivory-dim pt-5">
                <div className="text-gold mb-3">{p.icon}</div>
                <p className="font-body font-semibold text-body-sm uppercase tracking-wider text-midnight mb-1.5">
                  {p.label}
                </p>
                <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
