import { ListingCard } from "@/components/ui/ListingCard";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { NoItems } from "../components/NoItems";


async function getData(userId: string) {
    noStore();
    const data = await prisma.home.findMany({
        where: {
        userId: userId,
        addedCategory: true,
        addedDescription: true,
        addedLocation: true,
        },
        select: {
        id: true,
        country: true,
        photo: true,
        description: true,
        price: true,
        Favorite: {
            where: {
            userId: userId,
            },
        },
        },
        orderBy: {
        createdAT: "desc",
        },
    });

    return data;
    }

    export default async function MyHomes() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }
    const data = await getData(user.id);
    return (
        <section className="container mx-auto px-5 lg:px-10 mt-32 mb-10">
        <h2 className="text-3xl text-center font-bold tracking-tight">Your Homes</h2>

        {data.length === 0 ? (
            <NoItems
            description="Please list a home on Globo so that you can see it right here"
            title="Your dont have any Homes listed"
            />
        ) : (
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
            {data.map((item) => (
                <ListingCard
                key={item.id}
                imagePath={item.photo as string}
                homeId={item.id}
                price={item.price as number}
                description={item.description as string}
                location={item.country as string}
                userId={user.id}
                pathName="/my-homes"
                favoriteId={item.Favorite[0]?.id}
                isInFavoriteList={item.Favorite.length > 0 ? true : false}
                />
            ))}
            </div>
        )}
        </section>
    );
}