import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN, // server-only write token
  useCdn: false,
});

export async function POST(req: NextRequest) {
  try {
  console.log("Token present:", !!process.env.SANITY_WRITE_TOKEN);
  console.log("Token prefix:", process.env.SANITY_WRITE_TOKEN?.slice(0, 10));
    const body = await req.json();

    // Basic server-side validation
    // if (!body.guestName || !body.phone || !body.date || !body.time || !body.partySize) {
    //   return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    // }

    const doc = await client.create({
      _type: "reservation",
      ...body,
    });

    return NextResponse.json({ success: true, id: doc._id });
  } catch (err) {
    console.error("Reservation write error:", err);
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 });
  }
}
