import { decalSortOptions, searchDecals } from "./lib/data";
import Search from "./ui/search";
import Footer from "./ui/footer";

import Sidebar from "./ui/sidebar/sidebar";
import DecalList from "./ui/decal-list";

interface SearchParams {
    query?: string;
    creator?: string;
    page?: string;
    sort?: string;
};

export default async function Page(
    {
        searchParams,
    }: {
        searchParams?: SearchParams;
    }
) {

    const query = searchParams?.query || '';
    const creator = searchParams?.creator;
    const sort = (searchParams?.sort || "default") as keyof typeof decalSortOptions;
    const data = await searchDecals(query, {
        max: 150,
        creator,
        sort: decalSortOptions[sort]
    });

    const decalListKey = JSON.stringify(searchParams);
    console.log(decalListKey);

    return (
        <main className="relative bg-dark-gray min-h-screen h-full text-white font-sans">
            <div className="sticky top-0 z-50 bg-dark-gray w-full border-b-2 border-b-border-gray">
                <Search></Search>
            </div>
            <div className="container">
                <div className="flex justify-center">

                    <Sidebar />

                    <div className="w-full py-4">
                        <h2 className="text-3xl font-bold mb-4">Results</h2>
                        <DecalList key={decalListKey} query={query} creator={creator} sort={sort} decals={data} />
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    );
}
