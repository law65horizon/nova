export const siteConfig = {
  name: "Nova Restaurant & Bar",
  shortName: "Nova",
  tagline: "Contemporary Dining. Live Music. Unforgettable Nights.",
  description:
    "Nova Restaurant & Bar — Asaba's premier upscale dining destination. Contemporary cuisine, premium cocktails, and weekend live music at 84 Okpanam Road, GRA Phase I, Asaba, Delta State.",
  url: "https://thenovarestaurant.ng",
  address: {
    street: "84 Okpanam Road",
    landmark: "Opposite the Legislative Quarters",
    city: "Asaba",
    state: "Delta State",
    country: "Nigeria",
    full: "84 Okpanam Road (Opp. Legislative Quarters), GRA Phase I, Asaba, Delta State",
  },
  phones: [
    { number: "08000000000", display: "0800 000 0000", label: "Main Line" },
    { number: "08000000001", display: "0800 000 0001", label: "Reservations" },
  ],
  instagram: "https://www.instagram.com/thenovarestaurant/",
  hours: [
    { days: "Monday – Thursday", time: "12:00 PM – 11:00 PM" },
    { days: "Friday – Saturday", time: "12:00 PM – 1:00 AM" },
    { days: "Sunday", time: "1:00 PM – 10:00 PM" },
  ],
  liveMusic: {
    days: "Fridays & Saturdays",
    time: "8:00 PM – Midnight",
    note: "Table reservations strongly recommended for live music nights.",
  },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7!2d6.698!3d6.201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNova+Restaurant+and+Bar!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng",
  coordinates: { lat: 6.201, lng: 6.698 },
  cuisine: "Contemporary Nigerian & International",
  priceRange: "$$$",
  socialLinks: [
    {
      name: "Instagram",
      url: "https://www.instagram.com/thenovarestaurant/",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
