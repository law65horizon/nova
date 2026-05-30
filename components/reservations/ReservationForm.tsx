"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Suspense } from "react";
import type { CartItem } from "@/components/menu/MenuPageClient";

const CART_KEY = "nova_reservation_cart";

// ── Package data ──────────────────────────────────────────────────────────────

type RiceBase = { label: string; value: string };
type SpiceLevel = { label: string; value: string };
type Addon = { label: string; value: string; price: number };

type PackageDef = {
  id: string;
  tier: "family" | "combo" | "date" | "private";
  tierLabel: string;
  name: string;
  tagline: string;
  description: string;
  serves: string;
  includes: string[];
  riceOptions?: RiceBase[];
  spiceLevels?: SpiceLevel[];
  addons: Addon[];
};

const PACKAGES: PackageDef[] = [
  // ── Family sharing tiers
  {
    id: "jollof_family",
    tier: "family",
    tierLabel: "Family Package",
    name: "Jollof Rice Family Package",
    tagline: "Nova's most iconic sharing platter",
    description: "Smoky Nigerian Jollof rice served in large sharing trays, loaded with sweet plantains and generous portions of protein. The one everyone comes back for.",
    serves: "Feeds 4–6",
    includes: ["Smoky Jollof rice (large tray)", "Sweet fried plantains (dodo)", "Choice of protein: chicken, turkey, or beef", "Coleslaw & side salad"],
    riceOptions: [
      { label: "Jollof Rice", value: "jollof" },
      { label: "Fried Rice", value: "fried" },
    ],
    spiceLevels: [
      { label: "Mild", value: "mild" },
      { label: "Medium", value: "medium" },
      { label: "Spicy (Lagos Level)", value: "spicy" },
    ],
    addons: [
      { label: "Extra Peppered Snail", value: "snail", price: 5000 },
      { label: "Extra Grilled Chicken", value: "chicken", price: 3500 },
      { label: "1L Fruit Punch Jug", value: "punch", price: 6000 },
    ],
  },
  {
    id: "coconut_family",
    tier: "family",
    tierLabel: "Family Package",
    name: "Coconut Rice Family Package",
    tagline: "Rich, aromatic and deeply satisfying",
    description: "A massive group-sized tray of rich coconut rice mixed with fish, chicken, and local spices. Fragrant, filling, and built for sharing.",
    serves: "Feeds 4–6",
    includes: ["Coconut-infused rice (large tray)", "Mixed fish & chicken", "Local spiced sauce", "Fried plantains"],
    spiceLevels: [
      { label: "Mild", value: "mild" },
      { label: "Medium", value: "medium" },
      { label: "Spicy (Lagos Level)", value: "spicy" },
    ],
    addons: [
      { label: "Extra Peppered Snail", value: "snail", price: 5000 },
      { label: "Extra Grilled Chicken", value: "chicken", price: 3500 },
      { label: "1L Fruit Punch Jug", value: "punch", price: 6000 },
    ],
  },
  {
    id: "seafood_platter",
    tier: "family",
    tierLabel: "Family Package",
    name: "Seafood Fried Rice Platter",
    tagline: "Premium ocean-to-table sharing feast",
    description: "Premium fried rice packed with prawns, crab, juicy shrimps, and golden plantains. The showstopper for special occasions.",
    serves: "Feeds 4–6",
    includes: ["Seafood fried rice (large tray)", "Prawns, crab & shrimps", "Golden fried plantains", "Grilled chicken sides"],
    riceOptions: [
      { label: "Fried Rice", value: "fried" },
      { label: "Jollof Rice", value: "jollof" },
    ],
    spiceLevels: [
      { label: "Mild", value: "mild" },
      { label: "Medium", value: "medium" },
      { label: "Spicy (Lagos Level)", value: "spicy" },
    ],
    addons: [
      { label: "Extra Peppered Snail", value: "snail", price: 5000 },
      { label: "Extra Grilled Chicken", value: "chicken", price: 3500 },
      { label: "1L Fruit Punch Jug", value: "punch", price: 6000 },
    ],
  },
  // ── Premium single-portion combos
  {
    id: "chinese_rice_combo",
    tier: "combo",
    tierLabel: "Premium Combo",
    name: "Chinese Rice & Salad Combo",
    tagline: "Date night on a plate",
    description: "Flavour-packed Chinese fried rice served alongside juicy grilled chicken, golden fried dodo, and fresh salad. Designed to photograph as good as it tastes.",
    serves: "1 person",
    includes: ["Chinese fried rice", "Grilled chicken", "Fried plantains (dodo)", "Fresh salad"],
    spiceLevels: [
      { label: "Mild", value: "mild" },
      { label: "Medium", value: "medium" },
      { label: "Spicy (Lagos Level)", value: "spicy" },
    ],
    addons: [
      { label: "Extra Grilled Chicken", value: "chicken", price: 3500 },
      { label: "Soft Sangria (glass)", value: "sangria", price: 4000 },
      { label: "Thick Fruit Smoothie", value: "smoothie", price: 3000 },
    ],
  },
  {
    id: "seafood_okro",
    tier: "combo",
    tierLabel: "Premium Combo",
    name: "Loaded Seafood Okro",
    tagline: "Heavy, local, unforgettable",
    description: "A premium swallow package packed heavily with snail, catfish, assorted meats, and extra protein per scoop. The real Nova experience.",
    serves: "1–2 people",
    includes: ["Seafood okro soup (large pot)", "Snail & catfish", "Assorted meats", "Choice of swallow (eba, fufu, or pounded yam)"],
    spiceLevels: [
      { label: "Mild", value: "mild" },
      { label: "Medium", value: "medium" },
      { label: "Spicy (Lagos Level)", value: "spicy" },
    ],
    addons: [
      { label: "Extra Peppered Snail", value: "snail", price: 5000 },
      { label: "Extra Catfish", value: "catfish", price: 4500 },
      { label: "1L Fruit Punch Jug", value: "punch", price: 6000 },
    ],
  },
  {
    id: "native_rice",
    tier: "combo",
    tierLabel: "Premium Combo",
    name: "Native Rice Special",
    tagline: "Local flavours, elevated",
    description: "Pineapple Rice or Native Jollof cooked with local spices and heavy proteins. A celebration of Nigerian flavour done Nova's way.",
    serves: "1–2 people",
    includes: ["Pineapple Rice or Native Jollof", "Heavy protein (beef, turkey, or chicken)", "Peppered sauce", "Fried plantains"],
    riceOptions: [
      { label: "Pineapple Rice", value: "pineapple" },
      { label: "Native Jollof", value: "native_jollof" },
    ],
    spiceLevels: [
      { label: "Mild", value: "mild" },
      { label: "Medium", value: "medium" },
      { label: "Spicy (Lagos Level)", value: "spicy" },
    ],
    addons: [
      { label: "Extra Grilled Chicken", value: "chicken", price: 3500 },
      { label: "Extra Peppered Snail", value: "snail", price: 5000 },
      { label: "Thick Fruit Smoothie", value: "smoothie", price: 3000 },
    ],
  },
  // ── Date Night & Lounge
  {
    id: "finger_food",
    tier: "date",
    tierLabel: "Date Night",
    name: "Finger Food Platter",
    tagline: "Perfect for lounge nights & small groups",
    description: "Combos featuring peppered snails, chicken pepper soup, gizzard, small chops, and fries. Light, shareable, and ideal for the lounge floor.",
    serves: "2–4 people",
    includes: ["Peppered snails", "Chicken pepper soup", "Gizzard & small chops", "Seasoned fries"],
    spiceLevels: [
      { label: "Mild", value: "mild" },
      { label: "Medium", value: "medium" },
      { label: "Spicy (Lagos Level)", value: "spicy" },
    ],
    addons: [
      { label: "Soft Sangria (bottle)", value: "sangria", price: 4000 },
      { label: "1L Fruit Punch Jug", value: "punch", price: 6000 },
      { label: "Extra Small Chops Platter", value: "small_chops", price: 4000 },
    ],
  },
  {
    id: "cocktail_combo",
    tier: "date",
    tierLabel: "Date Night",
    name: "Signature Cocktail & Smoothie Combo",
    tagline: "The Nova lounge experience",
    description: "Paired drink setups featuring Nova's signature Fruit Punch, Soft Sangria, or thick fruit smoothies. Perfect for couples or a night out.",
    serves: "2 people",
    includes: ["2× Signature cocktails or smoothies", "Small chops platter", "Peppered snail starter", "Seasoned fries"],
    addons: [
      { label: "Upgrade to Bottle Service", value: "bottle", price: 15000 },
      { label: "Add Finger Food Platter", value: "finger_food", price: 8000 },
      { label: "Add Extra Round of Drinks", value: "extra_drinks", price: 6000 },
    ],
  },
  // ── Private Events
  {
    id: "private_dining",
    tier: "private",
    tierLabel: "Private Event",
    name: "Private Dining Setup",
    tagline: "Corporate dinners, bridal showers & milestones",
    description: "Custom catering where the host pre-selects multiple group platters and drinks packages. Nova's team coordinates directly with you ahead of the event.",
    serves: "10+ guests",
    includes: ["Custom multi-platter menu", "Dedicated service staff", "Private section setup", "Complimentary welcome drinks"],
    addons: [
      { label: "Live Music Integration", value: "live_music", price: 0 },
      { label: "Custom Cake & Decoration", value: "decor", price: 25000 },
      { label: "Photography Package", value: "photography", price: 30000 },
    ],
  },
  {
    id: "live_music_package",
    tier: "private",
    tierLabel: "Private Event",
    name: "Live Music Themed Night",
    tagline: "The full Nova experience",
    description: "Food packages blended with Nova's weekly live music and themed social gatherings. Reserved seating, priority service, and an unforgettable night.",
    serves: "2–8 guests",
    includes: ["Priority live music seating", "Family sharing platter", "Welcome cocktails", "Dedicated waiter for the night"],
    addons: [
      { label: "Upgrade to Private Section", value: "private_section", price: 20000 },
      { label: "Bottle Service Add-on", value: "bottle", price: 15000 },
      { label: "Custom Birthday Decoration", value: "decor", price: 25000 },
    ],
  },
];

const TIER_ORDER: PackageDef["tier"][] = ["family", "combo", "date", "private"];
const TIER_LABELS: Record<PackageDef["tier"], string> = {
  family: "Family Packages",
  combo: "Premium Combos",
  date: "Date Night & Lounge",
  private: "Private Events",
};

// ── Types ─────────────────────────────────────────────────────────────────────

type PackageConfig = {
  packageId: string;
  packageName: string;
  riceBase?: string;
  spiceLevel?: string;
  addons: string[];   // addon values
  addonTotal: number;
  packageNotes: string;
};

type FormState = {
  guestName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  partySize: string;
  occasion: string;
  notes: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const timeSlots = [
  { label: "12:00 PM", value: "12:00" },
  { label: "1:00 PM", value: "13:00" },
  { label: "2:00 PM", value: "14:00" },
  { label: "3:00 PM", value: "15:00" },
  { label: "5:00 PM", value: "17:00" },
  { label: "6:00 PM", value: "18:00" },
  { label: "7:00 PM", value: "19:00" },
  { label: "8:00 PM ✦ Live Music", value: "20:00" },
  { label: "9:00 PM ✦ Live Music", value: "21:00" },
];

const occasions = [
  { label: "No Special Occasion", value: "none" },
  { label: "Birthday Celebration", value: "birthday" },
  { label: "Anniversary", value: "anniversary" },
  { label: "Business Dinner", value: "business" },
  { label: "Family Gathering", value: "family" },
  { label: "Live Music Night", value: "live_music" },
  { label: "Other", value: "other" },
];

const initialForm: FormState = {
  guestName: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  partySize: "2",
  occasion: "none",
  notes: "",
};

// ── Package configurator component ────────────────────────────────────────────

function PackageConfigurator({
  pkg,
  config,
  onChange,
  onClear,
}: {
  pkg: PackageDef;
  config: PackageConfig;
  onChange: (c: PackageConfig) => void;
  onClear: () => void;
}) {
  const update = (patch: Partial<PackageConfig>) =>
    onChange({ ...config, ...patch });

  const toggleAddon = (addon: Addon) => {
    const has = config.addons.includes(addon.value);
    const addons = has
      ? config.addons.filter((a) => a !== addon.value)
      : [...config.addons, addon.value];
    const addonTotal = pkg.addons
      .filter((a) => addons.includes(a.value))
      .reduce((s, a) => s + a.price, 0);
    update({ addons, addonTotal });
  };

  const optionClass = (selected: boolean) =>
    `flex items-center gap-3 px-4 py-2.5 border cursor-pointer transition-all duration-150 ${
      selected
        ? "border-gold bg-gold/5 text-midnight"
        : "border-outline-variant text-on-surface-variant hover:border-gold/40"
    }`;

  const labelCaps = "font-body text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block";

  return (
    <div className="border-t border-gold/20 mt-4 pt-5 space-y-5">
      {/* Rice base */}
      {pkg.riceOptions && (
        <div>
          <span className={labelCaps}>Rice Base *</span>
          <div className="flex flex-wrap gap-2">
            {pkg.riceOptions.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => update({ riceBase: r.value })}
                className={optionClass(config.riceBase === r.value)}
              >
                {config.riceBase === r.value && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                )}
                <span className="font-body text-body-sm">{r.label}</span>
              </button>
            ))}
          </div>
          {pkg.riceOptions && !config.riceBase && (
            <p className="font-body text-[11px] text-gold mt-1.5">Please select a rice base to continue</p>
          )}
        </div>
      )}

      {/* Spice level */}
      {pkg.spiceLevels && (
        <div>
          <span className={labelCaps}>Spice Level *</span>
          <div className="flex flex-wrap gap-2">
            {pkg.spiceLevels.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => update({ spiceLevel: s.value })}
                className={optionClass(config.spiceLevel === s.value)}
              >
                {config.spiceLevel === s.value && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                )}
                <span className="font-body text-body-sm">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Paid add-ons */}
      {pkg.addons.length > 0 && (
        <div>
          <span className={labelCaps}>Add Extras <span className="normal-case text-on-surface-variant/50">(optional)</span></span>
          <div className="space-y-2">
            {pkg.addons.map((addon) => {
              const checked = config.addons.includes(addon.value);
              return (
                <label
                  key={addon.value}
                  className={`flex items-center justify-between gap-4 px-4 py-3 border cursor-pointer transition-all duration-150 ${
                    checked ? "border-gold bg-gold/5" : "border-outline-variant hover:border-gold/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 border-2 shrink-0 flex items-center justify-center transition-all ${
                      checked ? "border-gold bg-gold" : "border-outline"
                    }`}>
                      {checked && (
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAddon(addon)}
                      className="sr-only"
                      aria-label={addon.label}
                    />
                    <span className="font-body text-body-sm text-on-surface">{addon.label}</span>
                  </div>
                  {addon.price > 0 && (
                    <span className="font-body text-[11px] uppercase tracking-widest text-gold shrink-0">
                      +₦{addon.price.toLocaleString()}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
          {config.addonTotal > 0 && (
            <p className="font-body text-[11px] uppercase tracking-widest text-on-surface-variant mt-2 text-right">
              Add-ons total: <span className="text-midnight font-semibold">+₦{config.addonTotal.toLocaleString()}</span>
            </p>
          )}
        </div>
      )}

      {/* Package notes */}
      <div>
        <label htmlFor="pkg-notes" className={labelCaps}>
          Allergies or cooking instructions <span className="normal-case text-on-surface-variant/50">(optional)</span>
        </label>
        <textarea
          id="pkg-notes"
          rows={3}
          placeholder="e.g. No onions, swap turkey for fish, nut allergy in the group..."
          value={config.packageNotes}
          onChange={(e) => update({ packageNotes: e.target.value })}
          className="w-full bg-surface-low border border-outline-variant text-on-surface font-body text-body-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors duration-200 placeholder:text-on-surface-variant/40 resize-none"
        />
        <p className="font-body text-[11px] text-on-surface-variant/50 mt-1">
          This note is printed directly onto the kitchen's order ticket.
        </p>
      </div>

      {/* Remove package */}
      <button
        type="button"
        onClick={onClear}
        className="font-body text-[11px] uppercase tracking-widest text-on-surface-variant/50 hover:text-on-surface-variant transition-colors"
      >
        ✕ Remove this package
      </button>
    </div>
  );
}

// ── Package card ──────────────────────────────────────────────────────────────

function PackageCard({
  pkg,
  isSelected,
  config,
  onSelect,
  onConfigChange,
  onClear,
}: {
  pkg: PackageDef;
  isSelected: boolean;
  config: PackageConfig | null;
  onSelect: () => void;
  onConfigChange: (c: PackageConfig) => void;
  onClear: () => void;
}) {
  const isConfigured =
    isSelected &&
    (!pkg.riceOptions || config?.riceBase) &&
    (!pkg.spiceLevels || config?.spiceLevel);

  return (
    <div
      className={`border transition-all duration-200 ${
        isSelected ? "border-gold" : "border-outline-variant hover:border-gold/40"
      }`}
    >
      {/* Card header — always visible */}
      <button
        type="button"
        onClick={onSelect}
        className="w-full text-left p-5 flex items-start gap-4"
        aria-expanded={isSelected}
      >
        {/* Radio indicator */}
        <div className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
          isSelected ? "border-gold" : "border-outline"
        }`}>
          {isSelected && <div className="w-2 h-2 rounded-full bg-gold" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-body text-[10px] uppercase tracking-widest text-gold">{pkg.tierLabel}</span>
            <span className="font-body text-[10px] text-on-surface-variant/50">·</span>
            <span className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant">{pkg.serves}</span>
            {isConfigured && (
              <span className="ml-auto font-body text-[10px] uppercase tracking-widest text-gold flex items-center gap-1">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Configured
              </span>
            )}
          </div>
          <h4 className="font-display font-semibold text-midnight text-base leading-snug mb-1">{pkg.name}</h4>
          <p className="font-body text-body-sm text-on-surface-variant">{pkg.tagline}</p>

          {/* Includes list — shown when not selected */}
          {!isSelected && (
            <ul className="mt-3 space-y-1">
              {pkg.includes.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-[11px] text-on-surface-variant">
                  <span className="text-gold mt-0.5 shrink-0">—</span>
                  {item}
                </li>
              ))}
              {pkg.includes.length > 3 && (
                <li className="font-body text-[11px] text-gold">+{pkg.includes.length - 3} more</li>
              )}
            </ul>
          )}
        </div>
      </button>

      {/* Expanded — full detail + configurator */}
      {isSelected && (
        <div className="px-5 pb-5">
          <p className="font-body text-body-sm text-on-surface-variant mb-4">{pkg.description}</p>
          <ul className="space-y-1.5 mb-2">
            {pkg.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 font-body text-[11px] text-on-surface-variant">
                <span className="text-gold mt-0.5 shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>

          <PackageConfigurator
            pkg={pkg}
            config={config ?? {
              packageId: pkg.id,
              packageName: pkg.name,
              riceBase: undefined,
              spiceLevel: undefined,
              addons: [],
              addonTotal: 0,
              packageNotes: "",
            }}
            onChange={onConfigChange}
            onClear={onClear}
          />
        </div>
      )}
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────

export default function ReservationForm() {
  return (
    <Suspense fallback={null}>
      <ReservationFormInner />
    </Suspense>
  );
}

function ReservationFormInner() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [pkgConfig, setPkgConfig] = useState<PackageConfig | null>(null);
  const [activeTier, setActiveTier] = useState<PackageDef["tier"]>("family");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) setCart(JSON.parse(stored));
    } catch {}
    setCartLoaded(true);
  }, []);

  const persistCart = useCallback((items: CartItem[]) => {
    setCart(items);
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {}
  }, []);

  const updateQty = (id: string, delta: number) => {
    persistCart(
      cart
        .map((c) => c.id === id ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c)
        .filter((c) => c.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => persistCart(cart.filter((c) => c.id !== id));
  const cartTotal = cart.reduce((s, c) => s + c.price * c.quantity, 0);
  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);

  const update = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSelectPackage = (pkg: PackageDef) => {
    if (selectedPkg === pkg.id) {
      // toggle off
      setSelectedPkg(null);
      setPkgConfig(null);
      return;
    }
    setSelectedPkg(pkg.id);
    setPkgConfig({
      packageId: pkg.id,
      packageName: pkg.name,
      riceBase: pkg.riceOptions ? undefined : undefined,
      spiceLevel: pkg.spiceLevels ? undefined : undefined,
      addons: [],
      addonTotal: 0,
      packageNotes: "",
    });
  };

  const handleClearPackage = () => {
    setSelectedPkg(null);
    setPkgConfig(null);
  };

  // Validation: if a package with required options is selected, ensure they're filled
  const pkgDef = PACKAGES.find((p) => p.id === selectedPkg);
  const pkgValid =
    !selectedPkg ||
    ((!pkgDef?.riceOptions || pkgConfig?.riceBase) &&
      (!pkgDef?.spiceLevels || pkgConfig?.spiceLevel));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgValid) {
      setErrorMsg("Please complete your package configuration before submitting.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");

    try {
      const orderItems = cart.map((c) => ({
        name: c.name,
        price: c.price,
        quantity: c.quantity,
      }));

      const doc = {
        _type: "reservation",
        guestName: form.guestName,
        phone: form.phone,
        email: form.email || undefined,
        date: form.date,
        time: form.time,
        partySize: parseInt(form.partySize),
        occasion: form.occasion,
        packageConfig: pkgConfig ?? undefined,
        notes: form.notes || undefined,
        orderItems: orderItems.length > 0 ? orderItems : undefined,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });

      if (!res.ok) throw new Error("Submission failed");

      try { localStorage.removeItem(CART_KEY); } catch {}
      setStatus("success");
      setForm(initialForm);
      setCart([]);
      setSelectedPkg(null);
      setPkgConfig(null);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try calling us directly.");
    }
  };

  const inputClass =
    "w-full bg-surface-low border border-outline-variant text-on-surface font-body text-body-md px-4 py-3 focus:outline-none focus:border-gold transition-colors duration-200 placeholder:text-on-surface-variant/50";
  const labelClass =
    "block font-body text-label-caps uppercase tracking-widest text-on-surface-variant mb-2";

  if (status === "success") {
    return (
      <section className="py-section px-6 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 border border-gold flex items-center justify-center mx-auto mb-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 className="font-display font-bold text-headline-md text-midnight mb-4">Reservation Received</h2>
          <p className="text-body-lg text-on-surface-variant mb-8">
            Thank you. We'll confirm your booking via phone or WhatsApp within a few hours. We look forward to welcoming you at Nova.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 border border-midnight text-midnight px-8 py-3 font-body text-label-caps uppercase tracking-widest hover:bg-midnight hover:text-ivory transition-all duration-200">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  const tierPackages = PACKAGES.filter((p) => p.tier === activeTier);

  return (
    <section aria-label="Table reservation">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-8">

            {/* ── Your Details ── */}
            <fieldset>
              <legend className="font-display font-semibold text-headline-sm text-midnight mb-6 pb-3 border-b border-ivory-dim w-full">
                Your Details
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="guestName" className={labelClass}>Full Name *</label>
                  <input id="guestName" type="text" required placeholder="e.g. Emeka Okafor" value={form.guestName} onChange={(e) => update("guestName", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone Number *</label>
                  <input id="phone" type="tel" required placeholder="e.g. 0812 345 6789" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className={labelClass}>
                    Email Address <span className="text-on-surface-variant/50 normal-case">(optional)</span>
                  </label>
                  <input id="email" type="email" placeholder="e.g. emeka@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
                </div>
              </div>
            </fieldset>

            {/* ── Booking Details ── */}
            <fieldset>
              <legend className="font-display font-semibold text-headline-sm text-midnight mb-6 pb-3 border-b border-ivory-dim w-full">
                Booking Details
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="date" className={labelClass}>Date *</label>
                  <input id="date" type="date" required value={form.date} min={new Date().toISOString().split("T")[0]} onChange={(e) => update("date", e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="time" className={labelClass}>Preferred Time *</label>
                  <select id="time" required value={form.time} onChange={(e) => update("time", e.target.value)} className={inputClass}>
                    <option value="">Select a time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>{slot.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="partySize" className={labelClass}>Party Size *</label>
                  <select id="partySize" required value={form.partySize} onChange={(e) => update("partySize", e.target.value)} className={inputClass}>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="occasion" className={labelClass}>Special Occasion</label>
                  <select id="occasion" value={form.occasion} onChange={(e) => update("occasion", e.target.value)} className={inputClass}>
                    {occasions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            {/* ── Pre-order from Menu ── */}
            <fieldset>
              <legend className="font-display font-semibold text-headline-sm text-midnight mb-2 pb-3 border-b border-ivory-dim w-full">
                Pre-order from Menu
                <span className="font-body text-label-caps text-on-surface-variant/60 normal-case font-normal tracking-normal ml-3 text-sm">optional</span>
              </legend>
              <p className="font-body text-body-sm text-on-surface-variant mb-5">
                Let the kitchen know what you're planning to enjoy. Items added from the{" "}
                <Link href="/menu" className="text-gold underline underline-offset-2">menu page</Link>{" "}
                appear here automatically.
              </p>
              {cartLoaded && cart.length > 0 ? (
                <div className="border border-outline-variant divide-y divide-outline-variant mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 px-4 py-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-body-sm text-on-surface font-medium truncate">{item.name}</p>
                        <p className="font-body text-[11px] text-on-surface-variant uppercase tracking-widest mt-0.5">
                          ₦ {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button type="button" onClick={() => updateQty(item.id, -1)} className="w-7 h-7 border border-outline-variant text-on-surface-variant hover:border-gold hover:text-gold transition-colors flex items-center justify-center font-body text-sm" aria-label={`Remove one ${item.name}`}>−</button>
                        <span className="font-body text-body-sm text-on-surface w-5 text-center">{item.quantity}</span>
                        <button type="button" onClick={() => updateQty(item.id, 1)} className="w-7 h-7 border border-outline-variant text-on-surface-variant hover:border-gold hover:text-gold transition-colors flex items-center justify-center font-body text-sm" aria-label={`Add one more ${item.name}`}>+</button>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.id)} className="text-on-surface-variant/40 hover:text-on-surface-variant transition-colors shrink-0 ml-1" aria-label={`Remove ${item.name}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center justify-between px-4 py-3 bg-gold/5">
                    <span className="font-body text-label-caps uppercase tracking-widest text-on-surface-variant">{cartCount} {cartCount === 1 ? "dish" : "dishes"} selected</span>
                    <span className="font-display font-semibold text-midnight">₦ {cartTotal.toLocaleString()}</span>
                  </div>
                </div>
              ) : cartLoaded ? (
                <div className="border border-dashed border-outline-variant px-5 py-6 text-center mb-4">
                  <p className="font-body text-body-sm text-on-surface-variant mb-3">No dishes selected yet.</p>
                  <Link href="/menu" className="font-body text-label-caps uppercase tracking-widest text-gold hover:underline underline-offset-2">Browse Menu →</Link>
                </div>
              ) : null}
              <p className="font-body text-body-sm text-on-surface-variant/60 italic">
                This is a pre-order intent, not a payment. Final bill is settled at the restaurant.
              </p>
            </fieldset>

            {/* ── Packages ── */}
            <fieldset>
              <legend className="font-display font-semibold text-headline-sm text-midnight mb-2 pb-3 border-b border-ivory-dim w-full">
                Packages
                <span className="font-body text-label-caps text-on-surface-variant/60 normal-case font-normal tracking-normal ml-3 text-sm">optional</span>
              </legend>
              <p className="font-body text-body-sm text-on-surface-variant mb-5">
                Nova's curated sharing experiences. Select a tier, pick a package, then configure it to your group's taste.
              </p>

              {/* Tier tabs */}
              <div className="flex gap-0 border-b border-ivory-dim mb-5 overflow-x-auto scrollbar-none">
                {TIER_ORDER.map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setActiveTier(tier)}
                    className={`flex-shrink-0 px-4 py-2.5 font-body text-[10px] uppercase tracking-widest border-b-2 transition-all duration-150 -mb-px ${
                      activeTier === tier
                        ? "border-gold text-gold"
                        : "border-transparent text-on-surface-variant hover:text-midnight"
                    }`}
                  >
                    {TIER_LABELS[tier]}
                    {/* dot if a package from this tier is selected */}
                    {PACKAGES.filter((p) => p.tier === tier).some((p) => p.id === selectedPkg) && (
                      <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-gold align-middle" />
                    )}
                  </button>
                ))}
              </div>

              {/* Package cards for active tier */}
              <div className="space-y-3">
                {tierPackages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    isSelected={selectedPkg === pkg.id}
                    config={selectedPkg === pkg.id ? pkgConfig : null}
                    onSelect={() => handleSelectPackage(pkg)}
                    onConfigChange={(c) => setPkgConfig(c)}
                    onClear={handleClearPackage}
                  />
                ))}
              </div>

              {/* Selected package summary if it's on another tier */}
              {selectedPkg && !tierPackages.some((p) => p.id === selectedPkg) && (
                <div className="mt-4 flex items-center justify-between px-4 py-3 bg-gold/5 border border-gold/30">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-widest text-gold">Package selected</p>
                    <p className="font-body text-body-sm text-midnight font-medium">
                      {PACKAGES.find((p) => p.id === selectedPkg)?.name}
                    </p>
                  </div>
                  <button type="button" onClick={handleClearPackage} className="font-body text-[11px] text-on-surface-variant/50 hover:text-on-surface-variant transition-colors">✕ Remove</button>
                </div>
              )}
            </fieldset>

            {/* ── Special Requests ── */}
            <div>
              <label htmlFor="notes" className={labelClass}>
                Special Requests <span className="text-on-surface-variant/50 normal-case">(optional)</span>
              </label>
              <textarea
                id="notes"
                rows={4}
                placeholder="Dietary requirements, seating preferences, surprise arrangements..."
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <div className="bg-red-50 border border-red-200 px-5 py-4">
                <p className="font-body text-body-sm text-red-700">{errorMsg}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting" || !pkgValid}
              className="w-full bg-gold text-midnight py-4 font-body text-label-caps uppercase tracking-widest font-semibold hover:bg-gold-light active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting"
                ? "Submitting…"
                : !pkgValid
                ? "Complete package configuration to continue"
                : "Confirm Reservation"}
            </button>

            <p className="text-center font-body text-body-sm text-on-surface-variant">
              We'll reach out within a few hours to confirm. For same-day bookings, please call us directly.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}