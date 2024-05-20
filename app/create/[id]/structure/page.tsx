//import { createCategoryPage } from "@/app/actions";
//import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { createCategoryPage } from "@/app/action";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { SelectCategory } from "@/app/components/SelectCategory";

export default function StructureRoute({params}: {params: {id: string}}) {
    return (
        <>
            <div className="w-3/5 mx-auto text-center">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors">
                    Which of these best describe your Home?
                </h2>
            </div>

            <form action={createCategoryPage}>

                <input required type="hidden" name="homeId" value={params.id} />

                <SelectCategory />

                <CreationBottomBar />
            </form>
        </>
    );
}
