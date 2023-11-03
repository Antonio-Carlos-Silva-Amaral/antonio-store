import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
    apiVersion: "2023-10-16"
})

export const POST = async (request: Request) =>{
    // esse ! dis que sempre vai haver uma signature
    const signature = request.headers.get('stripe-signature')!
   

    if(!signature){
        return NextResponse.error()
    }

    const text = await request.text()

    
    const event = stripe.webhooks.constructEvent(
        text,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET_KEY,
      );
    

        // com esse ckeckout eu consigo tratar qualquer evento tipo quando o pagamento nao for valido 

        
    if(event.type === "checkout.session.completed"){

        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
              expand: ['line_items'],
            }
          );
          const lineItems = sessionWithLineItems.line_items;
          // apartir daqui criar o pedido 

        
    }
    
  

    return NextResponse.json({received: true})

    // agente usa o stripe secret key, usa o signature, e o stripe webhook secret key para verificar
    // se o evento realmente existe 


}