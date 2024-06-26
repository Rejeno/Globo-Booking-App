import { createReservation } from "@/app/action";
import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { HomeMap } from "@/app/components/HomeMap";
import { SelectCalender } from "@/app/components/SelectCalendar";
import { ReservationSubmitButton } from "@/app/components/Submitbuttons";
import { useCountries } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { format } from 'date-fns';

async function getData(homeid: string) {
    noStore();
    const data = await prisma.home.findUnique({
        where: {
            id: homeid,
        },
        select: {
            photo: true,
            description: true,
            guests: true,
            bedrooms: true,
            bathrooms: true,
            title: true,
            categoryName: true,
            price: true,
            country: true,
            Reservation: {
                where: {
                    homeId: homeid,
                    },
                },
            User: {
                select: {
                    profileImage: true,
                    firstName: true,
                    email: true,
                    createdAt: true,
                    },
                },
            },
        });
    
        return data;
    }

export default async function HomeRoute({
    params,
    }: {
        params: { id: string };
    }) {
    const data = await getData(params.id);
    const { getCountryByValue } = useCountries();
    const country = getCountryByValue(data?.country as string);
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const formattedDate = data?.User?.createdAt ? format(new Date(data.User.createdAt), 'MMMM yyyy') : null;
    return (
        <div className="w-full md:w-[75%] mx-auto mt-32 mb-12 px-4 md:px-0">
            <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
            <div className="relative h-[300px] md:h-[550px]">
                <Image
                    alt="Image of Home"
                    src={`https://zsjmcggrnqxrdypgvfug.supabase.co/storage/v1/object/public/images/${data?.photo}`}
                    fill
                    className="rounded-lg h-full object-cover w-full"
                />
            </div>
    
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-24 mt-8">
                <div className="w-full md:w-2/3">
                    <h3 className="text-xl font-medium">
                        {country?.flag} {country?.label} / {country?.region}
                    </h3>
                    <div className="flex gap-x-2 text-muted-foreground">
                        <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> *{" "}
                        {data?.bathrooms} Bathrooms
                    </div>
    
                    <div className="flex items-center mt-6">
                        <img
                            src={
                                data?.User?.profileImage ??
                                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                            }
                            alt="User Profile"
                            className="w-11 h-11 rounded-full"
                        />
                        <div className="flex flex-col ml-4">
                            <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
                            <p className="text-sm text-muted-foreground">{data?.User?.email}</p>
                            <p className="text-sm text-muted-foreground">Host since {formattedDate}</p>
                        </div>
                    </div>
    
                    <Separator className="my-7" />
    
                    <CategoryShowcase categoryName={data?.categoryName as string} />
    
                    <Separator className="my-7" />
    
                    <p className="text-muted-foreground text-justify">{data?.description}</p>
    
                    <Separator className="my-7" />
    
                    <HomeMap locationValue={country?.value as string} />
                </div>
    
                <form action={createReservation} className="gap-2 w-full md:w-1/3 flex flex-col items-center">
                    <input type="hidden" name="homeId" value={params.id} />
                    <input type="hidden" name="userId" value={user?.id} />

                    <SelectCalender reservation={data?.Reservation} />

                    {user?.id ? (
                        <ReservationSubmitButton />
                    ) : (
                        <Button className="pt-2 w-full">
                            <LoginLink className="w-full">Reserve</LoginLink>
                        </Button>
                    )}
                </form>

            </div>
        </div>
    );
    
}