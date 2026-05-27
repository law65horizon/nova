import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-midnight text-ivory" role="contentinfo">
      <div className="max-w-site mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-display font-bold text-2xl tracking-widest mb-1">
              NOVA<span className="text-gold">.</span>
            </p>
            <p className="font-body text-label-caps uppercase tracking-widest text-ivory/40 mb-5">
              Restaurant & Bar
            </p>
            <p className="text-body-md text-ivory/60 max-w-sm leading-relaxed mb-6">
              {siteConfig.tagline}
              <br />
              GRA Phase I, Asaba — Delta State.
            </p>
            <Link
              href="/reservations"
              className="inline-flex items-center gap-2 border border-gold text-gold px-5 py-2.5 text-label-caps uppercase tracking-widest hover:bg-gold hover:text-midnight transition-colors duration-200"
            >
              Reserve a Table
            </Link>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="font-body text-label-caps uppercase tracking-widest text-ivory/40 mb-5">
              Navigate
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/menu", label: "Our Menu" },
                { href: "/reservations", label: "Reservations" },
                { href: "/find-us", label: "Find Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-ivory/60 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body text-label-caps uppercase tracking-widest text-ivory/40 mb-5">
              Contact
            </h3>
            <address className="not-italic space-y-3">
              <p className="text-body-sm text-ivory/60 leading-relaxed">
                {siteConfig.address.street}<br />
                {siteConfig.address.landmark}<br />
                {siteConfig.address.city}, {siteConfig.address.state}
              </p>
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone.number}
                  href={`tel:+234${phone.number.replace(/^0/, "")}`}
                  className="block text-body-sm text-ivory/60 hover:text-ivory transition-colors"
                >
                  {phone.display}
                </a>
              ))}
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-body-sm text-ivory/60 hover:text-gold transition-colors"
              >
                @thenovarestaurant
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* Hours strip */}
      <div className="border-t border-ivory/5">
        <div className="max-w-site mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-x-8 gap-y-1">
            {siteConfig.hours.map((h) => (
              <span key={h.days} className="text-body-sm text-ivory/40">
                <strong className="text-ivory/60">{h.days}:</strong> {h.time}
              </span>
            ))}
          </div>
          <p className="text-body-sm text-ivory/25">
            &copy; {new Date().getFullYear()} Nova Restaurant & Bar
          </p>
        </div>
      </div>
    </footer>
  );
}
