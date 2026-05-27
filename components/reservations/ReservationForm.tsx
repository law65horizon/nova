"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; // wrap needed if using useSearchParams in a client component

type FormState = {
  guestName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  partySize: string;
  occasion: string;
  packageRequest: string;
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

const packages = [
  { label: "No Package (à la carte)", value: "none" },
  { label: "The Nova Family Platter — Feeds up to 5", value: "nova_family" },
  { label: "The Legislators' Table — Feeds up to 4", value: "legislators" },
  { label: "The Weekend Duo — 2 people", value: "duo" },
];

const initialForm: FormState = {
  guestName: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  partySize: "2",
  occasion: "none",
  packageRequest: "none",
  notes: "",
};

export default function ReservationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Inside the component, before the form state:
  const searchParams = useSearchParams();
  const preselectedItem = searchParams.get("item");
  const preselectedPrice = searchParams.get("price");

  const update = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      // Sanity mutation via the Mutations API (no token needed for public write if dataset allows it,
      // but in production this should go through a Next.js API route with a write token)
      const doc = {
        _type: "reservation",
        guestName: form.guestName,
        phone: form.phone,
        email: form.email || undefined,
        date: form.date,
        time: form.time,
        partySize: parseInt(form.partySize),
        occasion: form.occasion,
        packageRequest: form.packageRequest,
        notes: form.notes || undefined,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      console.log("sending")
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doc),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      setForm(initialForm);
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
          <h2 className="font-display font-bold text-headline-md text-midnight mb-4">
            Reservation Received
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-8">
            Thank you. We'll confirm your booking via phone or WhatsApp within a
            few hours. We look forward to welcoming you at Nova.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-midnight text-midnight px-8 py-3 font-body text-label-caps uppercase tracking-widest hover:bg-midnight hover:text-ivory transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Table reservation">
      

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-8">
            
            {/* Guest info */}
            <fieldset>
              <legend className="font-display font-semibold text-headline-sm text-midnight mb-6 pb-3 border-b border-ivory-dim w-full">
                Your Details
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="guestName" className={labelClass}>Full Name *</label>
                  <input
                    id="guestName"
                    type="text"
                    required
                    placeholder="e.g. Emeka Okafor"
                    value={form.guestName}
                    onChange={(e) => update("guestName", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="e.g. 0812 345 6789"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className={labelClass}>Email Address <span className="text-on-surface-variant/50 normal-case">(optional)</span></label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. emeka@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </fieldset>

            {/* Booking details */}
            <fieldset>
              <legend className="font-display font-semibold text-headline-sm text-midnight mb-6 pb-3 border-b border-ivory-dim w-full">
                Booking Details
              </legend>
              {preselectedItem && (
  <div className="flex items-start justify-between gap-4 bg-gold/8 border border-gold/30 px-5 py-4 mb-2">
    <div>
      <p className="font-body text-label-caps uppercase tracking-widest text-gold mb-1">
        Selected Dish
      </p>
      <p className="font-display font-semibold text-headline-sm text-midnight">
        {preselectedItem}
      </p>
      {preselectedPrice && (
        <p className="font-body text-body-sm text-on-surface-variant mt-0.5">
          ₦ {Number(preselectedPrice).toLocaleString()}
        </p>
      )}
    </div>
    <Link
      href="/reservations"
      className="font-body text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-midnight transition-colors shrink-0 mt-0.5"
      aria-label="Clear selected dish"
    >
      ✕ Clear
    </Link>
  </div>
)}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="date" className={labelClass}>Date *</label>
                  <input
                    id="date"
                    type="date"
                    required
                    value={form.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => update("date", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="time" className={labelClass}>Preferred Time *</label>
                  <select
                    id="time"
                    required
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>{slot.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="partySize" className={labelClass}>Party Size *</label>
                  <select
                    id="partySize"
                    required
                    value={form.partySize}
                    onChange={(e) => update("partySize", e.target.value)}
                    className={inputClass}
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="occasion" className={labelClass}>Special Occasion</label>
                  <select
                    id="occasion"
                    value={form.occasion}
                    onChange={(e) => update("occasion", e.target.value)}
                    className={inputClass}
                  >
                    {occasions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Package */}
            <fieldset>
              <legend className="font-display font-semibold text-headline-sm text-midnight mb-2 pb-3 border-b border-ivory-dim w-full">
                Family Package
              </legend>
              <p className="font-body text-body-sm text-on-surface-variant mb-5">
                Our packages are Nova's best value — lavish platters at highly
                affordable pricing. <Link href="/menu" className="text-gold underline underline-offset-2">View menu</Link> for details.
              </p>
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <label
                    key={pkg.value}
                    className={`flex items-center gap-4 p-4 border cursor-pointer transition-all duration-150 ${
                      form.packageRequest === pkg.value
                        ? "border-gold bg-gold/5"
                        : "border-outline-variant hover:border-gold/40"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                      form.packageRequest === pkg.value ? "border-gold" : "border-outline"
                    }`}>
                      {form.packageRequest === pkg.value && (
                        <div className="w-2 h-2 rounded-full bg-gold" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="packageRequest"
                      value={pkg.value}
                      checked={form.packageRequest === pkg.value}
                      onChange={(e) => update("packageRequest", e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-body text-body-sm text-on-surface">{pkg.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Notes */}
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
              disabled={status === "submitting"}
              className="w-full bg-gold text-midnight py-4 font-body text-label-caps uppercase tracking-widest font-semibold hover:bg-gold-light active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Submitting…" : "Confirm Reservation"}
            </button>

            <p className="text-center font-body text-body-sm text-on-surface-variant">
              We'll reach out within a few hours to confirm. For same-day bookings,
              please call us directly.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
