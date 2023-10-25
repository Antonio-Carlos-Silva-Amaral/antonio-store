"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductwhitTotalPrice } from "@/helpers/product";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useState } from "react";

// aqui eu digo que o pick vai pegar apenas esse campos que eu mencionei
interface ProductInfoProps {
    product : Pick<
        ProductwhitTotalPrice,
        "basePrice"
        | "description"
        | "discountPercentage"
        | "totalPrice"
        | "name"
    >
}


const ProductInfo = ({product:{basePrice,totalPrice,description,discountPercentage,name}}:ProductInfoProps) => {

    const [quantity,setQuantity] = useState(1)

    const handleDecreaseQuantityClicky = () =>{
        setQuantity(prev =>  (prev === 1 ? prev : prev - 1))
    }
    const handleIncreaseQuantityClicky = () =>{
        setQuantity(prev =>  prev + 1)
    }

    return ( 
        <div className="flex flex-col px-5">
            <h2 className="text-lg">{name}</h2>

            <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">R$ {totalPrice.toFixed(2)}</h1>
                {discountPercentage > 0 && (
                <Badge className="px-2 py-[2px]">
                <ArrowDownIcon size={14}/>{discountPercentage}%
                 </Badge>
                )}
            </div>

            {discountPercentage > 0 &&(
                <p className="text-sm opacity-75 line-through">
                    R$ {Number(basePrice).toFixed(2)}
                </p>
            
            )}


            <div className="flex items-center gap-2 mt-4">
                <Button size="icon" variant="outline" onClick={() => handleDecreaseQuantityClicky()}>
                    <ArrowLeftIcon size={16}/>
                </Button>

                <span>{quantity}</span>

                <Button size="icon" variant="outline" onClick={() => handleIncreaseQuantityClicky()}>
                    <ArrowRightIcon size={16}/>
                </Button>
            </div>

            <div className="flex flex-col gap-3 mt-8">
                <h3 className="font-bold ">Descrição</h3>
                <p className="text-justify opacity-60 text-sm">{description}</p>
            </div>

            <Button className="mt-8 uppercase font-bold">Adicionar ao carrinho</Button>

            <div className="bg-accent flex items-center px-5 py-2 justify-between mt-5 rounded-lg">
                <div className="flex items-center gap-2">

                    <TruckIcon/>

                    <div className="flex flex-col">
                        <p className="text-xs">Entrega via <span className="font-bold">ASPacket®</span></p>
                        <p className="text-[#8162ff] text-xs">Envio para <span className="font-bold">todo  brasil</span></p>
                    </div>
                </div>

                <p className="font-bold text-xs">Frete grátis </p>
            </div>
        </div>
     );
}
 
export default ProductInfo;