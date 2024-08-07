'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(value: string) {
        const params = new URLSearchParams(searchParams);
        params.set('query', value);
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
            <input
                placeholder="Search"
                defaultValue={searchParams.get('query')?.toString()}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
        </div>
    );
}