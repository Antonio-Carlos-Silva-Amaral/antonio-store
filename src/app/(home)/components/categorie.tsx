import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";
import { HeadphonesIcon, KeyboardIcon, MonitorIcon, MouseIcon, SpeakerIcon, SquareIcon } from "lucide-react";

// aqui criei uma interface para setar o que vou receber e esse category apos os : ele o prisma ja importa pra gente
interface CategoryItemProps{
    category: Category
}

// ajeitar aqui depois
const CategoryItem = ({category} : CategoryItemProps) => {
    const categoryIcon ={
        keyboards:<KeyboardIcon size={16}/>,
        monitors: <MonitorIcon size={16}/>,
        headphones:<HeadphonesIcon size={16}/>,
        mousepads:<SquareIcon size={16}/>,
        speakers:<SpeakerIcon size={16}/>,
        mouses:<MouseIcon size={16}/>
    }
    return (
        <Badge variant="outline" className="py-3 flex items-center justify-center gap-2 rounded-lg">
            {/* // Aqui eu dei um map nos slug e para cada slug eu vou renderizar um componente de acordo com meu objeto  */}
            {categoryIcon[category.slug as keyof typeof categoryIcon]}
            <span className="font-bold text-xs">{category.name}</span>
        </Badge>
      );
}
 
export default CategoryItem;