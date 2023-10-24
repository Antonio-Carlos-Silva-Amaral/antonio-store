import { Product } from "@prisma/client";

// aqui quer dizer que agora Product vai ter a propriedade de total price tipo eu to juntando para que ProductwhitTotalPrice
// tenha tudo que product tem mais o que foi adicionado que seria o total price
export interface ProductwhitTotalPrice extends Product{
    totalPrice: number;
}


export const computProductTotalPrice = (product: Product): ProductwhitTotalPrice =>{
    if(product.discountPercentage === 0){
        return {
            ...product,
            totalPrice: Number(product.basePrice)
        }
    }

    const priceDiscount = Number(product.basePrice) * (product.discountPercentage / 100)
    const totalPrice = Number(product.basePrice) - priceDiscount
    return{
        ...product,
        totalPrice
    }
}