import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import CategoryItem from "./components/category-item";

const CataloPage = async () => {

    const catagories = await prismaClient.category.findMany({})

    return <div className="p-5 gap-8 flex flex-col">
        <Badge  variant="heading">
            <ShapesIcon size={16}/>
            Catálogo
        </Badge>

        <div className="grid grid-cols-2 gap-8">
            {catagories.map(category => <CategoryItem key={category.id} category={category}/>)}
        </div>
    </div>
}
 
export default CataloPage;