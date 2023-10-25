import { ProductwhitTotalPrice } from "@/helpers/product";
import Image from 'next/image'
import { Badge } from "./ui/badge";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import DiscountBadge from "./ui/discount-badge";

// aqui agente ta usando já com o total price
interface ProductItemProps{
    product: ProductwhitTotalPrice
}

const ProductItem = ({product} : ProductItemProps) => {
    return (
        <Link href={`/product/${product.slug}`}>
            <div className="flex flex-col gap-4">
                <div className="relative bg-accent rounded-lg h-[170px] w-full flex items-center justify-center">
                    <Image
                        src={product.imageUrls[0]}
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="h-auto max-h-[70%] w-auto max-w-[80%] "
                        // ignifica que o conteúdo (no caso, uma imagem) será dimensionado para caber dentro da caixa do elemento, mantendo a proporção original, sem distorcer.
                        style={{
                            objectFit: 'contain'
                        }}
                        alt={product.name}
                    />
                    {product.discountPercentage > 0 &&(
                        <DiscountBadge className="absolute left-3 top-3">
                            {product.discountPercentage}
                        </DiscountBadge>
                    )}
                </div>


                <div className="flex flex-col gap-1">
                <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</p>
                <div className="flex items-center gap-2  text-sm overflow-hidden whitespace-nowrap ">
                    {product.discountPercentage > 0 ?(
                        <>
                        <p className="font-semibold">R$ {product.totalPrice.toFixed(2)}</p>
                        {/* // line-Through ele adiciona a linha cortando */}
                        <p className="opacity-75 line-through text-xs text-ellipsis overflow-hidden whitespace-nowrap ">R$ {Number(product.basePrice).toFixed(2)}</p>
                        </>
                    ):(
                        <p className="font-semibold text-sm overflow-hidden whitespace-nowrap ">R$ {product.basePrice.toFixed(2)}</p>
                    )}

                    
                </div>
                </div>
                <div className="moscando">
                        
                </div>
            </div>
        </Link>
    )
}
 
export default ProductItem;