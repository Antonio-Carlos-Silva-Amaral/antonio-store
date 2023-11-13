"use server"

import { CartProduct } from "@/provider/cart"
import Stripe from  'stripe'

export const createCheckout = async (
    products: CartProduct[],
    orderId: string
    ) =>{
    // CRIAR CHECKOUT
    // estou importando a biblioteca do stripe e criando uma nova instância ela inicia o objeto stripe com dois parâmetros um
    // a chave secreta do stripe e o outro parametro a versão da api que estou utilizando 
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
            apiVersion:"2023-10-16"
        })

        

        // aqui quer aui eu estou utilizando o objeto stripe para iniciar uma sessão de checkout
        const checkout = await stripe.checkout.sessions.create({
            // Define os tipos de métodos de pagamento aceitos. Neste caso, está configurado para aceitar cartões de crédito
            payment_method_types:["card"],
            //  Define o modo da sessão de checkout. No seu código, está configurado como 'payment', o que indica que se trata de um pagamento direto.
            mode: 'payment',
            // url pra que o cliente vai ser redirecionado se o pagamento foi um sucesso 
            success_url: process.env.HOST_URLS,
            // caso der erro vai para esta url
            cancel_url: process.env.HOST_URLS,
            metadata:{
                orderId
            },
            line_items: products.map(product =>{
                return {
                    price_data:{
                        // nossa moeda
                        currency:'brl',
                        // dados nosso produto
                        product_data:{
                            name: product.name,
                            description: product.description,
                            images: product.imageUrls
                        },
                        // preço do produto
                        unit_amount: product.totalPrice * 100
                    },
                    // quantidade do produto
                    quantity: product.quantity
                }
            })
        })

     
    // RETORNAR CHECKOUT
    return checkout
}