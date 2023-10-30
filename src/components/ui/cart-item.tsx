import { CartContext, CartProduct } from "@/provider/cart";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { useContext } from "react";

interface CartItemProps {
    product: CartProduct
}

const CartItem = ({product}: CartItemProps ) => {

    const {decreaseProductQuantity,increaseProductQuantity} = useContext(CartContext)  

    const handleDecreaseProductQuantity = () =>{
        decreaseProductQuantity(product.id)
    }
    const handleIncreaseProductQuantity = () =>{
        increaseProductQuantity(product.id)
    }

    return ( 
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">

                <div className="bg-accent flex items-center justify-center rounded-lg h-[77px] w-[77px]" >
                    <Image
                        src={product.imageUrls[0]}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-auto h-auto max-w-[80%] max-h-[70%]"
                        alt={product.name}
                    />
                </div>

                <div className="flex flex-col">
                    <p className="text-xs">{product.name}</p>

                    <div className="flex items-center gap-2">
                        <p className="font-bold text-sm">R${product.totalPrice.toFixed(2)}</p>
                        {product.discountPercentage > 0 &&(
                            <p className="opacity-75 line-through text-xs">R$ {Number(product.basePrice).toFixed(2)}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" className="w-8 h-8" onClick={handleDecreaseProductQuantity} >
                            <ArrowLeftIcon size={16}/>
                        </Button>

                        <span className="text-xs gap-1">{product.quantity}</span>

                        <Button size="icon" variant="outline" className="w-8 h-8" onClick={handleIncreaseProductQuantity}>
                            <ArrowRightIcon size={16}/>
                        </Button>
                    </div>
                </div>
            </div>

            <Button size="icon" variant="outline">
                <TrashIcon size={16}/>
            </Button>
        </div>

     );
}
 
export default CartItem; 