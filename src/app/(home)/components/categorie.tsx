import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/category-icon";
import { Category } from "@prisma/client";
import Link from "next/link";

// aqui criei uma interface para setar o que vou receber e esse category apos os : ele o prisma ja importa pra gente
interface CategoryItemProps{
    category: Category
}

// ajeitar aqui depois
const CategoryItem = ({category} : CategoryItemProps) => {
    
    return (
        <Link href={`/category/${category.slug}`}>
            <Badge variant="outline" className="py-3 flex items-center justify-center gap-2 rounded-lg">
                {/* // Aqui eu dei um map nos slug e para cada slug eu vou renderizar um componente de acordo com meu objeto  */}
                {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
                <span className="font-bold text-xs">{category.name}</span>
            </Badge>
        </Link>
      );
}
 
export default CategoryItem;