import { ModeToggle } from "@/components/theme-toogle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { createGloboHome } from "../action";

export async function UserNav (){
    const {getUser} = getKindeServerSession();
    const user = await getUser ();

    const createHomewithid = createGloboHome.bind(null, {
        userId: user?.id as string,
    });

    return(
    <div className="flex gap-2">
        <div className="mt-1">
            <ModeToggle/>
        </div>

        <a href="/my-reservations">
        <div className="mt-1 flex items-center justify-between hidden md:block text-sm hover:shadow-md dark:hover:shadow-white font-semibold py-3 px-4 rounded-full  transition cursor-pointer">
            My Reservations
        </div>
        </a>

        <div>
        <DropdownMenu>
            <DropdownMenuTrigger>
            <div className="hover:shadow-md dark:hover:shadow-white rounded-full border px-2 py-2 lg:px-4 lg:py-2 md:rounded-full rounded-lg flex items-center gap-x-3">
                <MenuIcon className="w-6 h-6 lg:w-5- lg:h-5"/>

                <img
                    src={
                    user?.picture ?? "https://jeffjbutler.com/wp-content/uploads/2018/01/default-user.png"
                }
                alt="Image of the User" className="hidden md:block rounded-full h-8 w-8 "/>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
            {user ? (
                <>
                    <DropdownMenuItem>
                    <Link href="/" className="w-full">
                        Home
                    </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem>
                    <form action={createHomewithid} className="w-full">
                    <button type="submit" className="w-full text-start">
                    Globo your Home
                    </button>
                    </form>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                    <Link href="/my-homes" className="w-full">
                        My Listings
                    </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                    <Link href="/favorites" className="w-full">
                        My Favorites
                    </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                    <Link href="/my-reservations" className="w-full">
                        My Reservations
                    </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <LogoutLink className="w-full">Logout</LogoutLink>
                    </DropdownMenuItem>
                </>
                ): (
                <>
                    <DropdownMenuItem>
                        <RegisterLink className="w-full">Register</RegisterLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LoginLink className="w-full">Login</LoginLink>
                    </DropdownMenuItem>
                </>
            )}
        </DropdownMenuContent>
        </DropdownMenu>
        </div>
    </div>
    )
}