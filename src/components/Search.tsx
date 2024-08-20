"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

export default function Search() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const param = searchParams.get('query')?.toString();
    const [query, setQuery] = useState(param);

    const replaceSearchParams = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value.length != 0) {
            params.set('query', value);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    };
    const debounceSearchParams = useDebouncedCallback(
        (value: string) => replaceSearchParams(value), 
        500
    );

    const handleSearch = (value: string) => {
        setQuery(value);
        debounceSearchParams(value);
    };

    const clearSearch = () => {
        setQuery("");
        replaceSearchParams("");
    };
    
    return (
        <div className="container flex justify-between gap-4">
            <div className="w-full">
                <div>
                    <input
                        className="bg-transparent w-full p-4 outline-none text-xl"
                        value={query}
                        placeholder="Search"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <button
                    className="p-4"
                    onClick={clearSearch}
                >
                    <CloseIcon />
                </button>
            </div>
        </div>

    );
}
