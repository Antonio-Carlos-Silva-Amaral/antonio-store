import ProductItem from "@/components/product-item";
import { computProductTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";

interface ProductListProps{
    products : Product[]
}

const ProductList = ({products}: ProductListProps) => {
    return ( 
        <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
            {products.map((product) => (
                    <ProductItem  product={computProductTotalPrice(product)}
                    className="w-[156px] lg:w-[200px] lg:min-w-[200px]"
                     />
            ))}
        </div>
     );
}
 
export default ProductList;