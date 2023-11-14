import { prismaClient } from "@/lib/prisma";
import CategoryItem from "./categorie";

const Categories = async () => {

    // utilizando o prismaCliente esse código vai retornar para mim todas as categorias do meu banco
    const categories = await prismaClient.category.findMany({})

    // Aqui eu to pegando as categorias que eu recebo to dando um map em todas e passando para meu componente 
    // o id de a categoria deles e la eu acesso o name de cada 
    return ( 
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 lg:grid-cols-6">
            {categories.map(category => <CategoryItem key={category.id} category={category}/>)}
        </div>
     );
}
 
export default Categories;