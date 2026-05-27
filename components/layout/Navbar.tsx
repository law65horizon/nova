"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/reservations", label: "Reservations" },
  { href: "/find-us", label: "Find Us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isLight = scrolled || menuOpen;

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isLight
            ? "bg-midnight/96 backdrop-blur-md border-b border-gold/10"
            : "bg-transparent"
        }`}
      >
        <nav
          className="max-w-site mx-auto px-6 flex items-center justify-between h-16 md:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-bold text-2xl tracking-widest text-ivory hover:text-gold transition-colors duration-200"
            aria-label="Nova Restaurant & Bar — home"
          >
            NOVA<span className="text-gold">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-label-caps uppercase tracking-widest transition-colors duration-200 relative group ${
                  pathname === link.href
                    ? "text-gold"
                    : "text-ivory/70 hover:text-ivory"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/reservations"
            className="hidden md:inline-flex items-center gap-2 border border-gold text-gold px-5 py-2.5 text-label-caps uppercase tracking-widest hover:bg-gold hover:text-midnight transition-all duration-200"
            aria-label="Reserve a table"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Reserve a Table
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block h-0.5 w-6 bg-ivory transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-ivory transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-ivory transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>

        {/* Mobile drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-midnight border-t border-gold/10 px-6 py-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-label-caps uppercase tracking-widest transition-colors ${
                  pathname === link.href ? "text-gold" : "text-ivory/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reservations"
              className="inline-flex items-center justify-center gap-2 border border-gold text-gold px-5 py-3 text-label-caps uppercase tracking-widest mt-2 hover:bg-gold hover:text-midnight transition-all"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
