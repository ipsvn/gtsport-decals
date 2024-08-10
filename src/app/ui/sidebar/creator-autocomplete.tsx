"use client";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { User } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SidebarCreatorAutocomplete() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const param = searchParams.get('creator')?.toString();

    const [loaded, setLoaded] = useState(!param);

    useEffect(() => {

        if (!param || loaded) return;

        (async () => {
            await fetchOptions(param);
            setLoaded(true);
        })();

    }, [loaded]);

    const fetchOptions = useDebouncedCallback(async (value: string) => {
        const response = await fetch("/api/creators/search?query=" + value);
        const json = await response.json();
        const results = json.results as User[];

        setOptions(results.map(it => it.name ?? ""));
    }, 100);

    function updateQuery(user: string | null) {
        const params = new URLSearchParams(searchParams);
        if (user != null) {
            params.set('creator', user);
        } else {
            params.delete('creator');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const [options, setOptions] = useState<readonly string[]>([]);

    return (
        <Autocomplete
            id="sidebar-filter-creator"
            className="w-full"
            size="small"
            defaultValue={param}
            onChange={(event, value) => {
                if (!value) {
                    setOptions([]);
                }
                updateQuery(value);
            }}
            onInputChange={async (event, value, reason) => {
                if (!value || reason === "reset") {
                    return;
                }
                fetchOptions(value);
            }}
            noOptionsText="No results"
            options={options}
            filterOptions={(x) => x}
            renderInput={(params) => <TextField {...params} label="Creator" />}
        />
    );
}