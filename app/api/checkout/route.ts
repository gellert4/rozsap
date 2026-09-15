import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const plan = url.searchParams.get("plan");
  if (!process.env.STRIPE_SECRET_KEY) return NextResponse.redirect(new URL("/dashboard", url));
  const price = plan === "pro" ? process.env.STRIPE_PRO_PRICE_ID : process.env.STRIPE_CREATOR_PRICE_ID;
  if (!price) return NextResponse.json({ error: "Stripe price is not configured." }, { status: 500 });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#pricing`,
  });
  return NextResponse.redirect(session.url!);
}
