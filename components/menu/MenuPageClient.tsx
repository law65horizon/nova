"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SanityMenuCategory, SanityMenuItem } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { siteConfig } from "@/lib/config";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const CART_KEY = "nova_reservation_cart";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) setCart(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = useCallback((items: CartItem[]) => {
    setCart(items);
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {}
  }, []);

  const addItem = useCallback((item: SanityMenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item._id);
      const next = existing
        ? prev.map((c) => c.id === item._id ? { ...c, quantity: c.quantity + 1 } : c)
        : [...prev, { id: item._id, name: item.name, price: item.price, quantity: 1 }];
      try { localStorage.setItem(CART_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => {
      const next = prev.filter((c) => c.id !== id);
      try { localStorage.setItem(CART_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const clearCart = useCallback(() => persist([]), [persist]);

  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.quantity, 0);

  return { cart, addItem, removeItem, clearCart, totalItems, totalPrice };
}

type Props = { categories: SanityMenuCategory[] };

function MenuItemCard({
  item,
  cartQty,
  onAdd,
}: {
  item: SanityMenuItem;
  cartQty: number;   // 0 = not in cart, >0 = current quantity
  onAdd: (item: SanityMenuItem) => void;
}) {
  const imageUrl = urlFor(item.image).width(600).height(416).fit("crop").auto("format").url();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const inCart = cartQty > 0;

  return (
    <article className="group bg-white overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageUrl}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="bg-gold text-midnight font-body text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold">
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* Quantity badge on the image */}
        {inCart && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-midnight border border-gold flex items-center justify-center">
            <span className="font-body text-[11px] font-semibold text-gold">{cartQty}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-headline-sm text-midnight mb-2 leading-snug">
          {item.name}
        </h3>
        <p className="font-body text-body-sm text-on-surface-variant leading-relaxed">
          {item.description}
        </p>
        <div className="mt-4 pt-4 border-t border-ivory-dim flex items-center justify-between">
          <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
            ₦ {item.price.toLocaleString()}
          </span>
          <button
            onClick={handleAdd}
            aria-label={`Add ${item.name} to reservation`}
            className={`font-body text-label-caps uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 ${
              added
                ? "text-midnight"
                : inCart
                ? "text-gold hover:opacity-70"
                : "text-gold hover:underline underline-offset-2"
            }`}
          >
            {added ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Added ({cartQty})
              </>
            ) : inCart ? (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10"/></svg>
                {cartQty} in order · Add more →
              </>
            ) : (
              "Add to Reservation →"
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

// Sticky cart bar at the bottom
function CartBar({ totalItems, totalPrice, onClear }: { totalItems: number; totalPrice: number; onClear: () => void }) {
  const router = useRouter();
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-midnight border-t border-gold/30 shadow-2xl">
      <div className="max-w-site mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center">
            <span className="font-body text-[11px] font-semibold text-midnight">{totalItems}</span>
          </div>
          <div>
            <p className="font-body text-label-caps uppercase tracking-widest text-ivory/60 text-[10px]">Selected dishes</p>
            <p className="font-display font-semibold text-ivory text-sm">
              ₦ {totalPrice.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onClear}
            className="font-body text-label-caps uppercase tracking-widest text-ivory/40 hover:text-ivory/80 transition-colors text-[11px]"
          >
            Clear
          </button>
          <button
            onClick={() => router.push("/reservations")}
            className="bg-gold text-midnight px-6 py-2.5 font-body text-label-caps uppercase tracking-widest font-semibold hover:bg-gold-light transition-colors duration-200 text-[11px]"
          >
            Reserve with {totalItems} {totalItems === 1 ? "dish" : "dishes"} →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MenuPageClient({ categories }: Props) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?._id ?? "");
  const { cart, addItem, removeItem, clearCart, totalItems, totalPrice } = useCart();

  const currentCategory = categories.find((c) => c._id === activeCategory) ?? categories[0];

  if (!currentCategory) {
    return (
      <div className="bg-ivory min-h-screen flex items-center justify-center">
        <p className="font-body text-body-lg text-on-surface-variant">Menu coming soon.</p>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen pb-24">
      {/* Sticky category tabs */}
      <div className="sticky top-16 md:top-20 z-40 bg-ivory/95 backdrop-blur-sm border-b border-ivory-dim shadow-sm">
        <div className="max-w-site mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto scrollbar-none" role="tablist" aria-label="Menu categories">
            {categories.map((cat) => (
              <button
                key={cat._id}
                role="tab"
                aria-selected={activeCategory === cat._id}
                aria-controls={`panel-${cat._id}`}
                onClick={() => setActiveCategory(cat._id)}
                className={`flex-shrink-0 px-6 md:px-10 py-5 font-body text-label-caps uppercase tracking-widest border-b-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset ${
                  activeCategory === cat._id
                    ? "border-gold text-gold"
                    : "border-transparent text-on-surface-variant hover:text-midnight"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category panel */}
      <div id={`panel-${currentCategory._id}`} role="tabpanel" aria-label={currentCategory.name} className="max-w-site mx-auto px-6 py-14">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="divider-gold" />
            <span className="font-body text-label-caps uppercase tracking-widest text-gold">{currentCategory.name}</span>
          </div>
          <h2 className="font-display font-bold text-headline-md text-midnight mb-3">{currentCategory.name}</h2>
          <p className="font-body text-body-lg text-on-surface-variant max-w-xl">{currentCategory.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.items.map((item) => (
            <MenuItemCard
              key={item._id}
              item={item}
              cartQty={cart.find((c) => c.id === item._id)?.quantity ?? 0}
              onAdd={addItem}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA strip */}
      <div className="bg-midnight py-14 px-6 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #C9A84C, transparent 50%)" }} />
        <div className="max-w-site mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="divider-gold" />
              <span className="font-body text-label-caps uppercase tracking-widest text-gold">Ready to Dine?</span>
            </div>
            <h2 className="font-display font-bold text-headline-sm text-ivory mb-1">Reserve Your Table</h2>
            <p className="font-body text-body-md text-ivory/60">Book online or call us directly. Family packages available on request.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/reservations" className="inline-flex items-center gap-2 bg-gold text-midnight px-7 py-3.5 font-body text-label-caps uppercase tracking-widest font-semibold hover:bg-gold-light transition-colors duration-200 justify-center">
              Reserve a Table
            </Link>
            {siteConfig.phones.slice(0, 1).map((phone) => (
              <a key={phone.number} href={`tel:+234${phone.number.replace(/^0/, "")}`} className="inline-flex items-center gap-2 border border-ivory/20 text-ivory px-7 py-3.5 font-body text-label-caps uppercase tracking-widest hover:border-ivory/60 transition-colors duration-200 justify-center">
                Call Us
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky cart bar */}
      <CartBar totalItems={totalItems} totalPrice={totalPrice} onClear={clearCart} />
    </div>
  );
}