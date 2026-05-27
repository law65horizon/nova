import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function LiveMusicSection() {
  return (
    <section
      className="relative py-section overflow-hidden"
      aria-label="Live music at Nova"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1800&q=85"
          alt="Live music performance at Nova Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-midnight/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-site mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="divider-gold" />
          <span className="font-body text-label-caps uppercase tracking-widest text-gold">
            The Nova Experience
          </span>
          <div className="divider-gold" />
        </div>

        <h2 className="font-display font-bold text-headline-lg text-ivory mb-4">
          Live Music. Every Weekend.
        </h2>
        <p className="text-body-lg text-ivory/65 max-w-lg mx-auto mb-10">
          {siteConfig.liveMusic.days}, starting at {siteConfig.liveMusic.time}.
          From Afrobeats to live band jazz — Nova transforms into Asaba's most
          vibrant night out. Tables fill fast.
        </p>

        {/* Info chips */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {[
            { icon: "🎵", text: "Live Band Performances" },
            { icon: "🍹", text: "Signature Cocktails" },
            { icon: "✨", text: "Premium Table Experience" },
          ].map((chip) => (
            <div
              key={chip.text}
              className="flex items-center gap-2 bg-ivory/5 border border-gold/20 px-5 py-2.5"
            >
              <span>{chip.icon}</span>
              <span className="font-body text-label-caps uppercase tracking-widest text-ivory/70">
                {chip.text}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/reservations"
          className="inline-flex items-center gap-2.5 bg-gold text-midnight px-10 py-4 font-body text-label-caps uppercase tracking-widest font-semibold hover:bg-gold-light active:scale-95 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Reserve Your Seat
        </Link>

        <p className="mt-5 font-body text-body-sm text-ivory/40">
          {siteConfig.liveMusic.note}
        </p>
      </div>
    </section>
  );
}
