'use client'

import Image from "next/image"
import Categories from "./components/categories-overview"

 
export default function Home() {
  
  return <div className="p-5">
          <Image
            src="/Banner-home-01.jpg"
            height={0}
            width={0}
            className="h-auot w-full"
            sizes="100vw"
            alt="Até 55% de desconto esse mês!"
          />

        <div className="mt-8">
          <Categories/>
        </div>
  </div>
}

  