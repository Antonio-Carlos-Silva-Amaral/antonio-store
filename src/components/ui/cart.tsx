import {  ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/provider/cart";
import CartItem from "./cart-item";
import { computProductTotalPrice } from "@/helpers/product";

const Cart = () => {

    const {products} = useContext(CartContext)
    return ( 
        <div className="flex flex-col gap-8">
           <Badge className="w-fit gap-1 text-base border-2 uppercase border-primary px-3 py-[0.375rem]" variant="outline">
            <ShoppingCartIcon size={16}/>
            Catálogo
        </Badge>


        <div className="flex flex-col gap-5">
            {products.map(
                product => <CartItem key={product.id} product={computProductTotalPrice(product as any) as any} />
                )}
        </div>
        </div>
     );
}
 
export default Cart;