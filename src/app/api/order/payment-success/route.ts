import { metadata } from "@/app/layout"
import { prismaClient } from "@/lib/prisma"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
    apiVersion: "2023-10-16"
})

// ...

export const POST = async (request: Request) => {
  // esse ! dis que sempre vai haver uma signature
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('Stripe Signature missing');
    return NextResponse.error();
  }

  const text = await request.text();

  try {
    // Verificação de assinatura
    const event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY,
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;

      console.log({ meta: session.metadata });
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ['line_items'],
        }
      );

      const lineItems = sessionWithLineItems.line_items;
      // a partir daqui criar o pedido
      console.log(lineItems);

      await prismaClient.order.update({
        where: {
          id: session.metadata.orderId,
        },
        data: {
          status: 'PAYMENT_CONFIRMED',
        },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error verifying Stripe Signature:', error);
    // Retornar uma resposta de erro ao Stripe
    return NextResponse.error();
  }
};
