"use client"

import { MenuIcon,ShoppingCartIcon,LogInIcon,PercentIcon,ListOrderedIcon,HomeIcon, LogOutIcon, PackageSearchIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import {signIn, signOut, useSession} from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import Link from  'next/link'
import Cart from "./cart";

const Header = () => {

    const {status,data} = useSession()

    const handleLoginClick = async () =>{
        await signIn()
    }
    const handleLogoutClick = async () =>{
        await signOut()
    }

    return <Card className="flex justify-between p-[1.875rem] items-center">
        <Sheet >
            {/* // aschild quer dizer que o primeiro filho que vai de fato abrir nosso menu */}
            <SheetTrigger asChild >
                <Button size="icon" variant="outline">
                    <MenuIcon/>
                </Button>
            </SheetTrigger>

            <SheetContent side="left">
                <SheetHeader className="text-left text-lg font-semibold">Menu</SheetHeader>

                {status === 'authenticated' && data?.user &&(
                  <div className="flex flex-col">
                        <div className="flex items-center my-2 gap-2 py-4">
                            <Avatar>
                                <AvatarFallback>{data?.user?.name?.[0].toUpperCase()}</AvatarFallback>

                                {data.user.image && (
                                    <AvatarImage src={data.user.image}/>
                                )}
                            </Avatar>

                            <div className="flex flex-col">
                            <p>{data.user.name}</p>
                            <p className="text-sm opacity-75">Boas compras !</p>
                            </div>
                        </div>
                        <Separator/>
                  </div>
                )}


               <div className="mt-2 flex flex-col gap-2">
                    {status === 'unauthenticated' &&(
                    <Button onClick={handleLoginClick} variant="outline" className="w-full justify-start gap-2">
                        <LogInIcon size={16}/>
                        Fazer Login
                    </Button>
                    )}

                    {status === 'authenticated' &&(
                    <Button onClick={handleLogoutClick} variant="outline" className="w-full justify-start gap-2">
                        <LogOutIcon size={16}/>
                        Fazer Logout
                    </Button>
                    )}
                    
                   <SheetClose asChild>
                    <Link href='/'>
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <HomeIcon size={16}/>
                            Início
                        </Button>
                    </Link>
                   </SheetClose>
                    
                    <SheetClose asChild>
                        <Link href='/orders'>
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <PackageSearchIcon size={16}/>
                                Meus pedidos
                            </Button>
                        </Link>
                    </SheetClose>

                    <SheetClose asChild>
                        <Link href='/deals'>
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <PercentIcon size={16}/>
                                Ofertas
                            </Button>
                        </Link>
                    </SheetClose>

                        {/* // aqui ele fecha o menu quando eu clicar em link por isso eu passo asChild */}
                    <SheetClose asChild>
                        <Link href={`/catalog`}>
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <ListOrderedIcon size={16}/>
                                Catálogo
                            </Button>
                        </Link>
                    </SheetClose>
               </div>

            </SheetContent>
        </Sheet>

        <Link href={`/`}>
            <h1 className="font-semibold text-lg"><span className="text-primary">Antônio </span>Store</h1>
        </Link>

        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                    <ShoppingCartIcon/>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[350px]">
                <Cart/>
            </SheetContent>
        </Sheet>
    </Card>
}
 
export default Header;