

import Image from "next/image"
import Categories from "./components/categories-overview"
import { prismaClient } from "@/lib/prisma"
import ProductList from "./components/product-list"

 
export default async function Home() {

  // eu pego os discountPercentage
  const deals = await prismaClient.product.findMany({
    where:{
      discountPercentage: {
        gt:0,
      },
    },
  })
  return <div className="p-5">
          <Image
            src="/Banner-home-01.jpg"
            height={0}
            width={0}
            className="h-auot w-full px-5"
            sizes="100vw"
            alt="Até 55% de desconto esse mês!"
          />

        <div className="mt-8 px-5">
          <Categories/>
        </div>

        <div className="mt-8">
          <p className="font-bold uppercase pl-5 mb-3">Ofertas</p>
          <ProductList products={deals}/>
        </div>

        <Image
            src="/Banner-home-02.png"
            height={0}
            width={0}
            className="h-auot w-full px-5"
            sizes="100vw"
            alt="Até 55% de desconto em mouses!"
          />
  </div>
}

  