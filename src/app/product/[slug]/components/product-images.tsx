"use client"

import Image from "next/image";
import { useState } from "react";

interface ProdructImagesProps {
    name: string
    imageUrls: string[]
}


const ProductImages = ({imageUrls,name}:ProdructImagesProps) => {

    const [currentImage,setCurrentImage] = useState(imageUrls[0])

    const handleImageClick = (imageUrl: string) =>{
        setCurrentImage(imageUrl)
    }

    // podia fazer assim também onClick={() => setCurrentImage(imageUrl)

    return ( 
        <div className="flex flex-col">
            <div className="bg-accent h-[380px] w-full  flex items-center justify-center">
                <Image src={currentImage} alt={name} height={0} width={0} sizes="100vw" 
                className="h-auto w-auto max-w-[80%] max-h-[70%]" 
                style={{
                    objectFit: "contain"
                }}/>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-8 px-5">
                {imageUrls.map(imageUrl => (
                    <button 
                    className={`bg-accent rounded-lg flex justify-center items-center h-[100px] 
                    ${
                        imageUrl === currentImage && 'border-2 border-primary border-solid'
                    }`} 
                    key={imageUrl}
                    onClick={() => handleImageClick(imageUrl)}
                    >
                        <Image src={imageUrl} alt={name} width={0} height={0} sizes="100vw"
                        className="h-auto w-auto max-w-[80%] max-h-[70%]"
                        />
                    </button>
                ))}
            </div>
        </div>
     );
}
 
export default ProductImages;