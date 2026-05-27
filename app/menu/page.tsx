import type { Metadata } from "next";
import MenuPageClient from "@/components/menu/MenuPageClient";
import { getMenuCategories } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Our Menu",
  description:
    "Explore Nova's full menu — contemporary Nigerian cuisine, premium cocktails, handcrafted drinks, and our celebrated Family Packages. Every dish, elevated.",
  alternates: { canonical: "https://thenovarestaurant.ng/menu" },
};

export default async function MenuPage() {
  const categories = await getMenuCategories();

  return (
    <>
      {/* Page hero */}
      <div className="bg-midnight pt-32 pb-16 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, #C9A84C, transparent 60%)",
          }}
        />
        <div className="max-w-site mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="divider-gold" />
            <span className="font-body text-label-caps uppercase tracking-widest text-gold">
              Our Offerings
            </span>
            <div className="divider-gold" />
          </div>
          <h1 className="font-display font-bold text-headline-lg text-ivory mb-4">
            The Nova Menu
          </h1>
          <p className="font-body text-body-lg text-ivory/60 max-w-xl mx-auto">
            Contemporary Nigerian cuisine crafted with seasonal ingredients,
            paired with premium cocktails and our celebrated Family Packages.
          </p>
        </div>
      </div>
      <MenuPageClient categories={categories} />
    </>
  );
}
