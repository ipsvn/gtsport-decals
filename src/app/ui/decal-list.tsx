"use client";

import ResultCard from "./decal-card";
import { decalSortOptions, FullDecal } from "../lib/data";
import Button from "@mui/material/Button";
import { useState } from "react";
import { DECAL_SEARCH_LIMIT } from "../api/decals/search/route";

interface DecalListProps {
    query: string,
    creator: string | undefined,
    sort: keyof typeof decalSortOptions,
    decals: FullDecal[]
}

export default function DecalList(
    {
        query,
        creator,
        sort,
        decals
    }: DecalListProps
) {
    const [data, setData] = useState(decals);
    const [saturated, setSaturated] = useState(false);

    async function fetchMoreData(after: bigint) {
        const params = new URLSearchParams({
            query: query,
            sort: sort.toString(),
            after: after.toString()
        });
        if (creator) params.append('creator', creator);
        const response = await fetch("/api/decals/search?" + params.toString());
        const json = await response.json();
        const results = json.results as FullDecal[]

        if (results.length < DECAL_SEARCH_LIMIT) {
            setSaturated(true);
        }

        setData([...data, ...results]);
    }

    const loadMoreButton = (<Button
        className="w-full"
        disabled={saturated}
        onClick={async () => fetchMoreData(data[data.length - 1].id)}
    >
        Load more
    </Button>);

    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-4">
                {data.map(it => (<ResultCard key={it.id} decal={it} />))}
            </div>
            <div className="pb-52 sm:pb-32">
                {sort === "default" && loadMoreButton}
            </div>
        </div>
    );

}