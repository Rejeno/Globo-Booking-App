import Image from "next/image";
import Link from "next/link";
import logo from '../../public/GloboLogo1Green.png';
import { SearchModalComponent } from "./Searchcomponents";
import { UserNav } from "./UserNav";

export function Navbar() {
    return (
        <nav className="z-20 w-full border-b fixed top-0 bg-white dark:bg-background z-10">
            <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
                <Link href="/">
                        <Image src={logo} alt="logo" width={180} height={100} className="hidden lg:block" />
                </Link>
                <SearchModalComponent />
                <UserNav />
            </div>
        </nav>
    );
}
