import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body.guestName || !body.phone || !body.date || !body.time || !body.partySize) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Sanitise orderItems — ensure _key on each array member (Sanity requires it)
    const orderItems = Array.isArray(body.orderItems)
      ? body.orderItems
          .filter((i: { name?: string; quantity?: number }) => i.name && i.quantity > 0)
          .map((i: { name: string; price: number; quantity: number }, idx: number) => ({
            _key: `item_${idx}_${Date.now()}`,
            name: i.name,
            price: Number(i.price) || 0,
            quantity: Number(i.quantity) || 1,
          }))
      : [];

    const doc = {
      _type: "reservation",
      guestName: body.guestName,
      phone: body.phone,
      email: body.email || undefined,
      date: body.date,
      time: body.time,
      partySize: parseInt(body.partySize),
      occasion: body.occasion || "none",
      packageRequest: body.packageRequest || "none",
      notes: body.notes || undefined,
      orderItems: orderItems.length > 0 ? orderItems : undefined,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    const created = await client.create(doc);
    return NextResponse.json({ success: true, id: created._id });
  } catch (err) {
    console.error("Reservation write error:", err);
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 });
  }
}
