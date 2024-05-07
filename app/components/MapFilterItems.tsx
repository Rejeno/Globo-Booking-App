'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { categoryItems } from "../lib/categoryitems";

export function MapFilterItems () {
    const searchParams = useSearchParams()
    const search = searchParams.get('filter')
    const pathName = usePathname()

    const createQueryString = useCallback(
        (name:string, value: string) => {
            const params = new URLSearchParams (searchParams.toString())

            params.set(name, value)

            return params.toString();
        }, [searchParams]
    );

    return(
        <div className="dark:text-white  container mx-auto px-5 lg:px-1 justify-between py-5 flex gap-x-10 mt-24 w-full overflow-x-scroll no-scrollbar">
                {categoryItems.map((item) => (
                    <Link key={item.id} href={
                        pathName + "?" + createQueryString('filter', item.name)}
                        className={cn(
                            search === item.name ? "dark:border-white border-b-2 border-black pb-2 flex-shrink-0" :
                            "opacity-70 flex-shrink-0 border-b-2 border-white dark:border-black hover:border-b-2 dark:hover:border-b-2 dark:hover:border-white", "hover:border-b-2 hover:border-black flex flex-col gap-y-3 items-center "
                        )} >
                        <div className="relative w-6 h-6">
                            <Image src={item.imageUrl} alt="Category image"
                            className="w-6 h-6 "
                            width={32}
                            height={32}
                            />
                        </div>

                        <p className="text-xs font-medium">
                            {item.title}
                        </p>
                    </Link>
                ))}
        </div>
    );
}
