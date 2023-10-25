import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";
import { computProductTotalPrice } from "@/helpers/product";
import ProductList from "@/components/ui/product-list";


interface ProductDetailsPageProps {
    params:{
        slug: string
    }
}

const ProductDetailsPage = async ({params: {slug}}: ProductDetailsPageProps) => {

    const product = await prismaClient.product.findFirst({
        where:{
            slug: slug
        },

        // aqui quer dizer que ele vai pegar o produto do slug e pegar a category dele a tabela
        // e vai incluir os produtos dessa category 
        include:{
            category:{
                include :{
                    products: {
                        where:{
                            slug:{
                                not: slug
                            }
                        }
                    }
                }
            }
        }

    })

    if(!product) return null

    return <div className="flex flex-col gap-8 pb-8">
        <ProductImages  name={product.name} imageUrls={product.imageUrls}/>
        <ProductInfo product={computProductTotalPrice(product)}/>
        {/* // aqui eu passei so os produtos da categoria do slug  menos o slug da url*/}
        <ProductList products={product.category.products}/>
    </div>
}
 
export default ProductDetailsPage;