import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function LocationStrip() {
  return (
    <section className="bg-navy text-ivory py-section-sm" aria-label="Location and hours">
      <div className="max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Address */}
          <div>
            <h3 className="font-body text-label-caps uppercase tracking-widest text-gold mb-4">
              Find Us
            </h3>
            <address className="not-italic">
              <p className="font-display font-semibold text-headline-sm text-ivory mb-1">
                {siteConfig.address.street}
              </p>
              <p className="text-body-sm text-ivory/60 mb-1">
                {siteConfig.address.landmark}
              </p>
              <p className="text-body-sm text-ivory/60">
                GRA Phase I · {siteConfig.address.city}, {siteConfig.address.state}
              </p>
            </address>
            <Link
              href="/find-us"
              className="inline-flex items-center gap-1 mt-4 font-body text-label-caps uppercase tracking-widest text-gold border-b border-gold pb-0.5 hover:opacity-70 transition-opacity"
            >
              Get Directions →
            </Link>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-body text-label-caps uppercase tracking-widest text-gold mb-4">
              Opening Hours
            </h3>
            <dl className="space-y-2">
              {siteConfig.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt className="text-body-sm text-ivory/60">{h.days}</dt>
                  <dd className="text-body-sm text-ivory font-medium">{h.time}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-body text-label-caps uppercase tracking-widest text-gold">
                Live Music: {siteConfig.liveMusic.days}
              </span>
            </div>
          </div>

          {/* Reserve CTA */}
          <div>
            <h3 className="font-body text-label-caps uppercase tracking-widest text-gold mb-4">
              Make a Reservation
            </h3>
            <p className="text-body-md text-ivory/60 mb-5">
              Book your table online. For live music nights, we recommend
              booking at least 24 hours in advance.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/reservations"
                className="inline-flex items-center gap-2 bg-gold text-midnight px-5 py-3 font-body text-label-caps uppercase tracking-widest hover:bg-gold-light transition-colors duration-200 justify-center sm:justify-start font-semibold"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Reserve a Table
              </Link>
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone.number}
                  href={`tel:+234${phone.number.replace(/^0/, "")}`}
                  className="inline-flex items-center gap-2 border border-ivory/20 text-ivory px-5 py-3 font-body text-label-caps uppercase tracking-widest hover:border-ivory/60 transition-colors duration-200 justify-center sm:justify-start"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.12.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.56 2.81.68A2 2 0 0122 16.92z"/>
                  </svg>
                  {phone.display}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
