"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import CloseIcon from '@mui/icons-material/Close';

export default function Search() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const param = searchParams.get('query')?.toString();

    const handleSearch = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value.length != 0) {
            params.set('query', value);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 500);
    
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
                    onClick={() => handleSearch("")}
                >
                    <CloseIcon />
                </button>
            </div>
        </div>

    );
}
