import ProductItem from "@/components/product-item";
import { Badge } from "@/components/ui/badge";
import { computProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { PercentIcon } from "lucide-react";

const DealsPage = async () => {

    const deals = await prismaClient.product.findMany({
        where:{
            discountPercentage:{
                gt:0
            },
        },
    })

    return (
        <div className="p-5 flex flex-col gap-8">
            <Badge variant="heading">
                <PercentIcon size={16}/>
                Ofertas
            </Badge>

            <div className="grid grid-cols-2 gap-8">
            {deals.map(product => <ProductItem key={product.id} product={computProductTotalPrice(product)}/>)}
            </div>
        </div>
      );
}
 
export default DealsPage;