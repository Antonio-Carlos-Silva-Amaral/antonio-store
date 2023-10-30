"use client"

import { ProductwhitTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductwhitTotalPrice{
    quantity: number
}

//Aqui é definida uma interface chamada ICartContext que descreve o formato do contexto do carrinho de compras. Ela possui as seguintes propriedades:
interface ICartContext {
    //products: Uma lista de produtos no carrinho, onde cada produto é do tipo CartProduct.
    products: CartProduct[]
    cartTotalPrice: number
    cartBasePrice: number
    cartTotalDiscount : number 
    // esse void quer dizer que ela nao retorna nenhum valor e como eu tivesse posto como any
    addProductsToCart: (product: CartProduct) => void
    decreaseProductQuantity: (product: string) => void
    increaseProductQuantity: (product: string) => void
    removeProductFromCart: (product: string) => void
 }

// O valor inicial do contexto é fornecido como um objeto que segue o formato da interface ICartContext
export const CartContext = createContext<ICartContext>({
    products: [],
    cartTotalPrice: 0,
    cartBasePrice: 0,
    cartTotalDiscount : 0,
    // funções inicia como valor vazio que não retorna nada
    addProductsToCart : () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity: () => {},
    removeProductFromCart: () => {}
})

const CartProvider = ({children} : {children : ReactNode}) => {

    const [products,setProducts] = useState<CartProduct[]>([])


    

    const addProductsToCart = (product: CartProduct) =>{

        const productIsAlreadyOnCart = products.some(carProduct => carProduct.id === product.id)

        if(productIsAlreadyOnCart){
            setProducts((prev) => 
                prev.map((carProduct) =>{
                    if(carProduct.id === product.id){
                        return{
                            ...carProduct,
                            quantity:carProduct.quantity + product.quantity
                        }
                    }

                    return carProduct
                })
            )

            return;
        }



        setProducts(prev => [...prev,product])  
    }

    const decreaseProductQuantity = (productId: string) =>{


        setProducts(
            prev => prev.map(cartProduct => {
                if(cartProduct.id === productId){
                    return{
                        ...cartProduct,
                        quantity: cartProduct.quantity - 1
                    }
                }

                return cartProduct;
             })
             .filter((cartProuct) => cartProuct.quantity > 0)
        )
    }
    const increaseProductQuantity = (productId: string) =>{

        setProducts(
            prev => prev.map(cartProduct => {
                if(cartProduct.id === productId){
                    return{
                        ...cartProduct,
                        quantity: cartProduct.quantity + 1
                    }
                }

                return cartProduct;
             })
            
        )
    }


    const removeProductFromCart = (productId: string) =>{
       setProducts(prev => prev.filter(cartProduct => cartProduct.id !== productId))
    }

    return (  
        <CartContext.Provider value={{
            products,
            addProductsToCart,
            decreaseProductQuantity,
            increaseProductQuantity,
            removeProductFromCart,
            cartTotalPrice: 0,
            cartBasePrice: 0,
             cartTotalDiscount : 0,
             
            
        } 
        }>
            {children}
        </CartContext.Provider>

    );
}
 
export default CartProvider;