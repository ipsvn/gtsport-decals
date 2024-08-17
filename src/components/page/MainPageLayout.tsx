"use server";

import Search from "@/components/Search";
import { DECAL_MAX_RESULTS } from "@/constants";
import { searchDecals } from "@/lib/data";
import { decalSortOptions } from "@/utils/data-utils";
import Sidebar from "../sidebar/Sidebar";
import DecalList from "../DecalList";
import Footer from "../Footer";
import { JumpToTopButton } from "../JumpToTopButton";

export interface MainPageLayoutParams {
    query?: string;
    creator?: string;
    sort?: string;
};

export async function MainPageLayout(
    params: MainPageLayoutParams
) {

    const query = params?.query || '';
    const creator = params?.creator;
    const sort = (params?.sort || "default") as keyof typeof decalSortOptions;
    const data = await searchDecals(query, {
        max: DECAL_MAX_RESULTS,
        creator,
        sort: decalSortOptions[sort]
    });

    const decalListKey = JSON.stringify({
        query,
        creator,
        sort
    });

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

            <Footer />

            <JumpToTopButton />

        </main>
    );

}