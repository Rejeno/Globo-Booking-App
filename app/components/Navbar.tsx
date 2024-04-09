import Image from "next/image"
import Link from "next/link"
import logo from '../../public/logo2.png'
import { SearchModalComponent } from "./Searchcomponents"
import { UserNav } from "./UserNav"

export function Navbar(){
    return(
        <nav className="w-full border-b fixed top-0 bg-white z-10">
            <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
                <Link href="/">
                    <Image src={logo} alt="logo" className="w-32 hidden lg:block" />
                    <Image src={logo} alt="mobilelogo" className="block lg:hidden w-12" />
                </Link>
                <SearchModalComponent />
                <UserNav />
            </div>
        </nav>
    )
}