'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const param = searchParams.get('query')?.toString();
    const [query, setQuery] = useState(param);

    function handleSearch(value: string) {
        const params = new URLSearchParams(searchParams);
        params.set('query', value);
        replace(`${pathname}?${params.toString()}`);
        setQuery(value);
    }

    return (
        <div className="container flex justify-between gap-4">
            <div className="w-full">
                <div>
                    <input
                        className="bg-transparent w-full py-4 outline-none text-xl"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div>
                <button
                    className="py-4"
                    onClick={(e) => {
                        handleSearch("");
                    }}
                >
                    X
                </button>
            </div>
        </div>

    );
}
