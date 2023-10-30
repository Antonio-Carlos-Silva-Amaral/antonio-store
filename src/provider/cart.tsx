"use client"

import { ProductwhitTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductwhitTotalPrice{
    quantity: number
}

interface ICartContext {
    products: CartProduct[]
    cartTotalPrice: number
    cartBasePrice: number
    cartTotalDiscount : number 
    addProductsToCart: (product: CartProduct) => void
    decreaseProductQuantity: (product: string) => void
 }


export const CartContext = createContext<ICartContext>({
    products: [],
    cartTotalPrice: 0,
    cartBasePrice: 0,
    cartTotalDiscount : 0,
    addProductsToCart : () => {},
    decreaseProductQuantity: () => {}
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

    return (  
        <CartContext.Provider value={{
            products,
            addProductsToCart,
            decreaseProductQuantity,
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