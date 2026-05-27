# Nova Restaurant & Bar — Preview Site

Next.js 15 + Sanity CMS + Tailwind v4 preview site for Nova Restaurant & Bar, Asaba.

## Brand
- **Colors**: Midnight navy (#0D1117), Gold (#C9A84C), Ivory (#F8F5EF)
- **Fonts**: Cormorant Garamond (display) + DM Sans (body)
- **Identity**: Contemporary upscale, GRA Phase I, Asaba

## Key features (vs Kinqsville base)
- Reservation form → writes to Sanity `reservation` document type via `/api/reservations`
- Family Package section showcasing Nova's signature group platters
- Live Music section highlighting weekend events
- No WhatsApp FAB (replaced by reservation flow)

## Env vars needed
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
SANITY_WRITE_TOKEN=   # server-only, for reservation writes
```

## Sanity schema additions
- `reservation` type: guestName, phone, email, date, time, partySize, occasion, packageRequest, notes, status, submittedAt

## Roadmap (if client signs)
1. Group Order Portal for corporate/family orders
2. Corporate Lunch Pre-order / Scheduled Delivery system
3. Visual Table Reservation with live seat map + holding fee payments (Paystack)
4. Full Sanity Studio dashboard for reservations management
