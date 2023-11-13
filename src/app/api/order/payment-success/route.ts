import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from 'crypto';

export const POST = async (request: Request) => {
  const stripeSignature = request.headers.get('stripe-signature');

  if (!stripeSignature) {
    return NextResponse.error();
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

  const payload = await request.text();

  const hash = crypto.createHmac('sha256', secret)
                     .update(payload)
                     .digest('hex');

  const isSignatureValid = stripeSignature === `t=${Date.now()},v1=${hash}`;

  if (!isSignatureValid) {
    return NextResponse.error();
  }

  // Continue process the webhook payload
  const event = JSON.parse(payload);

  if (event.type === 'checkout.session.completed') {
    // Handle your logic for checkout session completed
    const session = event.data.object as any;

    console.log({ meta: session.metadata });

    // ... rest of your logic
  }

  return NextResponse.json({ received: true });
};
