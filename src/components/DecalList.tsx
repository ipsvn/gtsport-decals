"use client";

import { decalSortOptions, FullDecal } from "@/utils/data-utils";
import { DECAL_MAX_RESULTS } from "@/constants";

import { useState } from "react";
import DecalCard from "./DecalCard";
import InfiniteScrollHelper from "./InfiniteScrollHelper";

import CircularProgress from '@mui/material/CircularProgress';

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
    const [loading, setLoading] = useState(false);
    const [saturated, setSaturated] = useState(false);

    async function fetchMoreData(after: bigint) {
        setLoading(true);

        const params = new URLSearchParams({
            query: query,
            sort: sort.toString(),
            after: after.toString()
        });
        if (creator) params.append('creator', creator);

        const response = await fetch("/api/decals/search?" + params.toString());
        const json = await response.json();
        const results = json.results as FullDecal[];

        if (results.length < DECAL_MAX_RESULTS) {
            setSaturated(true);
        }

        setData([...data, ...results]);
        setLoading(false);
    }

    const infiniteScrollHelper = <InfiniteScrollHelper onceInView={() => {
        if (!loading && !saturated) fetchMoreData(data[data.length - 1].id);
    }} />;

    return (
        <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pb-4">
                {data.map(it => (<DecalCard key={it.id} decal={it} />))}

                {!loading && data.length > 0 && infiniteScrollHelper}
            </div>
            <div className="mb-52 sm:mb-32 flex w-full justify-center">
                { !saturated && loading && <CircularProgress size={36}/> }
            </div>
        </div>
    );

}