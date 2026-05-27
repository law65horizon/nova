import type { Metadata } from "next";
import ReservationForm from "@/components/reservations/ReservationForm";

export const metadata: Metadata = {
  title: "Reserve a Table",
  description:
    "Book your table at Nova Restaurant & Bar — Asaba's premier upscale dining. Ideal for family packages, business dinners, and live music nights.",
};

export default function ReservationsPage() {
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
                Nova Restaurant & Bar
              </span>
              <div className="divider-gold" />
            </div>
            <h1 className="font-display font-bold text-headline-lg text-ivory mb-4">
              Reserve a Table
            </h1>
            <p className="font-body text-body-lg text-ivory/60 max-w-xl mx-auto">
              Book online and we'll confirm your reservation. For live music nights,
              early booking is strongly recommended — tables go fast.
            </p>
          </div>
        </div>
        <ReservationForm />
      </>
    );
}
