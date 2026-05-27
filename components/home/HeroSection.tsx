import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero — Nova Restaurant & Bar"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1800&q=85"
          alt="Nova Restaurant — upscale dining interior with ambient gold lighting and premium table settings"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={75}
        />
        {/* Dark overlay layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/75 to-midnight/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-midnight/20" />
      </div>

      {/* Gold left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gold to-transparent opacity-80 z-10" />

      {/* Decorative corner marks */}
      <div className="absolute top-28 left-8 w-12 h-12 border-t border-l border-gold/30 z-10 hidden md:block" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-site mx-auto px-6 pt-28 pb-24 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <div className="divider-gold" />
            <span className="font-body text-label-caps uppercase tracking-widest text-gold">
              GRA Phase I · Asaba, Delta State
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-display-xl text-ivory mb-2 animate-fade-up animate-delay-100">
            Where Every
          </h1>
          <h1 className="font-display font-bold text-display-xl text-gold-shimmer mb-6 animate-fade-up animate-delay-200">
            Night Shines.
          </h1>

          {/* Subtext */}
          <p className="text-body-lg text-ivory/75 mb-10 max-w-lg leading-relaxed animate-fade-up animate-delay-300">
            Contemporary cuisine, premium cocktails, and live music every
            weekend — right opposite the Legislative Quarters in Asaba's most
            prestigious district.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-up animate-delay-400">
            <Link
              href="/reservations"
              className="inline-flex items-center gap-2.5 bg-gold text-midnight px-8 py-4 font-body text-label-caps uppercase tracking-widest hover:bg-gold-light active:scale-95 transition-all duration-200 font-semibold"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Reserve a Table
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 border border-ivory/40 text-ivory px-8 py-4 font-body text-label-caps uppercase tracking-widest hover:border-ivory hover:bg-ivory/10 active:scale-95 transition-all duration-200"
            >
              View Our Menu
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Live music badge */}
          <div className="mt-10 inline-flex items-center gap-3 bg-ivory/5 border border-gold/20 px-5 py-3 animate-fade-up animate-delay-500">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="font-body text-label-caps uppercase tracking-widest text-ivory/70">
              Live Music Every{" "}
              <span className="text-gold">{siteConfig.liveMusic.days}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ivory to-transparent z-10 pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <span className="font-body text-label-caps text-ivory/60 tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
