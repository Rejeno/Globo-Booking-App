import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreationSubmit } from "./Submitbuttons";

export function CreationBottomBar() {
return (
    <div className="fixed w-full bottom-0 z-10 bg-white dark:bg-background border-t dark:border-gray-700 h-24">
    <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
        <Button variant="secondary" size="lg" asChild>
        <Link href="/">Cancel</Link>
        </Button>
        <CreationSubmit />
    </div>
    </div>
);
}