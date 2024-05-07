"use client";

import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { categoryItems } from "../lib/categoryitems";

export function SelectCategory() {
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
        undefined
    );

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-10 w-3/5 mx-auto mb-36">
            <input type="hidden" name="categoryName" value={selectedCategory as string} />
            
            {categoryItems.map((item) => (
                <div key={item.id} className="cursor-pointer">
                    <Card
                        className={selectedCategory === item.name ? "border-primary" : ""}
                        onClick={() => setSelectedCategory(item.name)}
                    >
                        <CardHeader>
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                height={32}
                                width={32}
                                className="dark:text-white w-8 h-8"
                            />
                            <h3 className="font-medium text-sm sm:text-base">
                                {item.title}
                            </h3>
                        </CardHeader>
                    </Card>
                </div>
            ))}
        </div>
    );
}
