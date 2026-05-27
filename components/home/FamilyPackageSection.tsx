import Link from "next/link";

const packages = [
  {
    name: "The Nova Family Platter",
    feeds: "Up to 5 people",
    includes: ["Pineapple Fried Rice", "Grilled Chicken (whole)", "Assorted Peppered Meat", "Coleslaw & Plantain"],
    badge: "Most Popular",
    highlight: true,
  },
  {
    name: "The Legislators' Table",
    feeds: "Up to 4 people",
    includes: ["Jollof Rice or White Rice", "Choice of 2 Proteins", "Vegetable Stir-fry", "Drinks for 4"],
    badge: "Corporate Favourite",
    highlight: false,
  },
  {
    name: "The Weekend Duo",
    feeds: "2 people",
    includes: ["Starter of Choice", "2 Main Courses", "Shared Dessert", "1 Bottle of Wine"],
    badge: "Date Night",
    highlight: false,
  },
];

export default function FamilyPackageSection() {
  return (
    <section className="py-section bg-midnight relative overflow-hidden" aria-label="Family packages">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle at 25% 50%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 75% 50%, #C9A84C 0%, transparent 50%)" }}
      />

      <div className="max-w-site mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="divider-gold" />
            <span className="font-body text-label-caps uppercase tracking-widest text-gold">
              Value & Abundance
            </span>
            <div className="divider-gold" />
          </div>
          <h2 className="font-display font-bold text-headline-lg text-ivory mb-4">
            Family Packages
          </h2>
          <p className="text-body-lg text-ivory/60 max-w-xl mx-auto">
            Nova's most-loved secret — lavish platters that feed the whole table
            at a fraction of individual pricing. Locally praised, endlessly requested.
          </p>
        </div>

        {/* Package cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative p-8 border transition-all duration-300 group hover:-translate-y-1 ${
                pkg.highlight
                  ? "border-gold bg-navy-light"
                  : "border-ivory/10 bg-navy/60 hover:border-gold/40"
              }`}
            >
              {/* Badge */}
              <div className="flex items-start justify-between mb-6">
                <span className={`font-body text-label-caps uppercase tracking-widest px-3 py-1 ${
                  pkg.highlight ? "bg-gold text-midnight" : "bg-ivory/10 text-ivory/60"
                }`}>
                  {pkg.badge}
                </span>
              </div>

              {/* Package name */}
              <h3 className="font-display font-semibold text-headline-sm text-ivory mb-1">
                {pkg.name}
              </h3>
              <p className="font-body text-label-caps uppercase tracking-widest text-gold mb-6">
                {pkg.feeds}
              </p>

              {/* Includes */}
              <ul className="space-y-2.5 mb-8">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className="text-gold mt-0.5 shrink-0" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span className="font-body text-body-sm text-ivory/70">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/reservations"
                className={`block text-center font-body text-label-caps uppercase tracking-widest px-6 py-3 transition-all duration-200 ${
                  pkg.highlight
                    ? "bg-gold text-midnight hover:bg-gold-light"
                    : "border border-gold/40 text-gold hover:border-gold hover:bg-gold/10"
                }`}
              >
                Book This Package
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center font-body text-body-sm text-ivory/40 mt-8">
          Package pricing and availability varies. Contact us or book online to confirm.
        </p>
      </div>
    </section>
  );
}
