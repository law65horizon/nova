import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Find Us",
  description:
    "Nova Restaurant & Bar is located at 84 Okpanam Road (opposite the Legislative Quarters), GRA Phase I, Asaba, Delta State. Open daily.",
};

export default function FindUsPage() {
  return (
    <>
      {/* Page hero */}
      <div className="bg-midnight pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #C9A84C, transparent 60%)" }}
        />
        <div className="max-w-site mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="divider-gold" />
            <span className="font-body text-label-caps uppercase tracking-widest text-gold">
              We're Easy to Find
            </span>
          </div>
          <h1 className="font-display font-bold text-headline-lg text-ivory mb-4">
            Find Nova
          </h1>
          <p className="font-body text-body-lg text-ivory/60 max-w-xl">
            Right opposite the Legislative Quarters, GRA Phase I — Asaba's most
            prestigious address.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-site mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Map */}
          <div>
            <div className="aspect-video bg-surface-container flex items-center justify-center border border-outline-variant">
              <div className="text-center text-on-surface-variant p-8">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-gold" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <p className="font-body text-body-sm">
                  Map embed will appear here with your Google Maps API key configured.
                </p>
                <a
                  href={`https://maps.google.com/?q=84+Okpanam+Road+Asaba+Delta+State+Nigeria`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 font-body text-label-caps uppercase tracking-widest text-gold border-b border-gold pb-0.5 hover:opacity-70 transition-opacity"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-10">
            <div>
              <h2 className="font-body text-label-caps uppercase tracking-widest text-gold mb-4">Address</h2>
              <address className="not-italic">
                <p className="font-display font-semibold text-headline-sm text-midnight">{siteConfig.address.street}</p>
                <p className="text-body-md text-on-surface-variant">{siteConfig.address.landmark}</p>
                <p className="text-body-md text-on-surface-variant">GRA Phase I · {siteConfig.address.city}, {siteConfig.address.state}</p>
              </address>
            </div>

            <div>
              <h2 className="font-body text-label-caps uppercase tracking-widest text-gold mb-4">Opening Hours</h2>
              <dl className="space-y-2">
                {siteConfig.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 border-b border-ivory-dim pb-2">
                    <dt className="text-body-sm text-on-surface-variant">{h.days}</dt>
                    <dd className="text-body-sm text-midnight font-medium">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="font-body text-label-caps uppercase tracking-widest text-gold">
                  Live Music: {siteConfig.liveMusic.days}, {siteConfig.liveMusic.time}
                </span>
              </div>
            </div>

            <div>
              <h2 className="font-body text-label-caps uppercase tracking-widest text-gold mb-4">Call Us</h2>
              <div className="space-y-2">
                {siteConfig.phones.map((phone) => (
                  <a
                    key={phone.number}
                    href={`tel:+234${phone.number.replace(/^0/, "")}`}
                    className="flex items-center gap-3 text-body-md text-midnight hover:text-gold transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.12.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.56 2.81.68A2 2 0 0122 16.92z"/>
                    </svg>
                    {phone.display} — {phone.label}
                  </a>
                ))}
              </div>
            </div>

            <Link
              href="/reservations"
              className="inline-flex items-center gap-2 bg-gold text-midnight px-8 py-4 font-body text-label-caps uppercase tracking-widest font-semibold hover:bg-gold-light transition-all duration-200"
            >
              Reserve a Table
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
