import {  ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/provider/cart";
import CartItem from "./cart-item";
import { computProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";

const Cart = () => {

    const {products,subTotal,total,totalDiscount} = useContext(CartContext)
    return ( 
        <div className="flex flex-col gap-8 h-full">
            <Badge className="w-fit gap-1 text-base border-2 uppercase border-primary px-3 py-[0.375rem]" variant="outline">
                <ShoppingCartIcon size={16}/>
                Carrinho
            </Badge>


            <div className="flex flex-col gap-5 h-full overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="flex flex-col h-full gap-4">
                        {products.length > 0 ? (
                        products.map(
                            product => <CartItem key={product.id} product={computProductTotalPrice(product as any) as any} />
                            )
                        ) : (
                            <p className="text-center font-semibold">Carrinho vázio</p>
                        )}
                    </div>
                </ScrollArea>
            </div>
            
            <div className="flex flex-col gap-3">
                <Separator />

                <div className="flex items-center justify-between text-xs">
                    <p>Subtotal</p>
                    <p>R$ {subTotal.toFixed(2)}</p>
                </div>

                <Separator/>    

                <div className="flex items-center justify-between text-xs">
                    <p>Entrega</p>
                    <p>Grátis</p>
                </div>

                <Separator/>  

                <div className="flex items-center justify-between text-xs">
                    <p>Descontos</p>
                    <p>-R$ {totalDiscount.toFixed(2)}</p>
                </div>

                <Separator/>  

                <div className="flex items-center justify-between text-sm font-bold">
                    <p>Total</p>
                    <p>R$ {total.toFixed(2)}</p>
                </div>

                <Button className="font-bold uppercase mt-7">Finalizar compras</Button>
            </div>
        </div>
     );
}
 
export default Cart;