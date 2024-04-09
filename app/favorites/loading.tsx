import { SkeltonCard } from "../components/SkeletonCard";

export default function Favoritesloading() {
    return (
        <section className="container mx-auto px-5 lg:px-10 mt-32">
        <h2 className="text-3xl font-bold text-center tracking-tight mb-3">Your Favorites</h2>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
            <SkeltonCard />
            <SkeltonCard />
            <SkeltonCard />
            <SkeltonCard />
            <SkeltonCard />
            <SkeltonCard />
            <SkeltonCard />
            <SkeltonCard />
        </div>
        </section>
    );
}