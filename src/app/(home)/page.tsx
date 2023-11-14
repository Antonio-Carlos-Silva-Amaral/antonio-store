
import Image from "next/image"
import Categories from "./components/categories-overview"
import { prismaClient } from "@/lib/prisma"
import PromoBanner from "./components/promo-banner"
import ProductList from "@/components/ui/product-list"
import SectionTitle from "@/components/ui/section-title"
import Link from "next/link"

 
export default async function Home() {

  // eu pego os discountPercentage
  const deals = await prismaClient.product.findMany({
    where:{
      discountPercentage: {
        gt:0,
      },
    },
  })

  const keyboards = await prismaClient.product.findMany({
    where:{
      category:{
        slug: 'keyboards'
      }
    }
  })
  const Mouses = await prismaClient.product.findMany({
    where:{
      category:{
        slug: 'mouses'
      }
    }
  })

  return (
  <>
      <div className="mx-auto max-w-[1920px]">
          <Link href="/deals">
            <PromoBanner
              src="/Banner-home-01.jpg"
              className="hidden h-auto w-full lg:block"
              alt="Até 55% de desconto esse mês!"
            />
          </Link>
      </div>

      <div className="mx-auto flex flex-col gap-8 py-8 lg:container lg:gap-10">
        <div className="px-5 lg:hidden">
            <Link href="/deals">
              <PromoBanner
                  src="/banner-55.png"
                  alt="Até 55% de desconto esse mês!"
                />
            </Link>
        </div>



            <div className="px-5 lg:mt-2">
              <Categories/>
            </div>

            <div className="flex flex-col gap-3 lg:gap-5">
              <SectionTitle className="pl-5">Ofertas</SectionTitle>
              <ProductList products={deals}/>
            </div>

            <div className="flex flex-col lg:flex-row">
              <Link href="/category/mouses" className="flex flex-1">
                <PromoBanner
                    src="/Banner-home-02.png"
                    alt="Até 55% de desconto em mouses!"
                    className="w-0 flex-1 px-5"
                  />
              </Link>

              <Link href="/category/headpones" className="flex flex-1">
                <PromoBanner
                    src="/Banner-home-03.png"
                    alt="Até 55% de desconto em mouses!"
                    className="w-0 flex-1 hidden lg:block"
                  />
              </Link>
            </div>

            <div className="flex flex-col gap-3 lg:gap-5">
              <SectionTitle className="pl-5">Teclados</SectionTitle>
              <ProductList products={keyboards}/>
            </div>

            <div>
              <div className="px-5 lg:hidden">
                <Link href="/category/headphones">
                  <PromoBanner
                    src="/Banner-home-03.png"
                    alt="Até 55% de desconto em mouses!"
                  />
                </Link>
              </div>
            
              <div className="px-5 lg:block hidden">
                <Link href="/catalog">
                  <PromoBanner
                    src="/banner-fretegrátis.png"
                    alt="Até 55% de desconto em mouses!"
                  />
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:gap-5">
              <SectionTitle className="pl-5">Mouses</SectionTitle>
              <ProductList products={Mouses}/>
            </div>
        </div>
    </>
  )
}

  