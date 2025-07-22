"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import LogoUrl from "/public/automod_logo_amws_border.svg";

import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";

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
            <div className="w-full flex gap-8 p-4">

                <Image src={LogoUrl} alt="Logo" width={48} />

                <div>
                    <input
                        className="bg-transparent w-full outline-none text-xl px-4"
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
