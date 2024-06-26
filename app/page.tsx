import { ListingCard } from "@/components/ui/ListingCard";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";
import { MapFilterItems } from "./components/MapFilterItems";
import { NoItems } from "./components/NoItems";
import { SkeltonCard } from "./components/SkeletonCard";
import type { PartialHome } from './interface';

async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
  };
}){
  noStore();
  const data = await prisma.home.findMany({
    where:{
      addedCategory:true,
      addedLocation:true,
      addedDescription:true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      
    },
    select:{
      photo:true,
      id:true,
      price:true,
      description:true,
      country:true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });
  return data;
}

export default function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
  };
}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading/>}>
      <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });

  const countMatches = (listing: PartialHome) => {
    let matches = 0;
    if (searchParams?.country && listing.country === searchParams.country) matches++;
    if (searchParams?.guest && listing.guests === searchParams.guest) matches++;
    if (searchParams?.room && listing.bedrooms === searchParams.room) matches++;
    return matches;
  };

  data.sort((a, b) => {
    const matchesA = countMatches(a);
    const matchesB = countMatches(b);
    return matchesB - matchesA;
  });

  return (
    <>
      {data.length === 0 ? (
        <NoItems
          title="No available Homes under this category"
          description="Please select another category or list your own Home"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-8 mt-8 mb-20">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              location={item.country as string}
              price={item.price as number}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/"
            />
          ))}
        </div>
      )}
    </>
  );
}


function SkeletonLoading() {
  return (
  <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
      <SkeltonCard />
  </div>
  );
}