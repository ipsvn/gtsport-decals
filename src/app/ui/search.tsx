'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const param = searchParams.get('query')?.toString();

    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('query', value);
        replace(`${pathname}?${params.toString()}`);
    }, 100);
    
    return (
        <div className="container flex justify-between gap-4">
            <div className="w-full">
                <div>
                    <input
                        className="bg-transparent w-full p-4 outline-none text-xl"
                        defaultValue={param}
                        placeholder="Search"
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div>
                <button
                    className="p-4"
                    onClick={(e) => handleSearch("")}
                >
                    X
                </button>
            </div>
        </div>

    );
}
