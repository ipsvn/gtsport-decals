'use client'

import { User } from "@prisma/client";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function SidebarCreatorAutocomplete() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const param = searchParams.get('creator')?.toString();

    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<readonly string[]>([]);

    const fetchOptions = useDebouncedCallback(async (value: string) => {
        setLoading(true);
        const response = await fetch("/api/creators/search?query=" + value);
        const json = await response.json();
        const results = json.results as User[];

        setOptions(results.map(it => it.name ?? ""));
        setLoading(false);
        setLoaded(true);
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

    return (
        <Autocomplete
            id="filter-creator-autocomplete"
            size="small"
            defaultValue={param}
            onOpen={() => {
                if (!loaded && !loading) fetchOptions(param ?? "");
            }}
            onChange={(_, value) => {
                updateQuery(value);
            }}
            onInputChange={async (_, value) => {
                fetchOptions(value);
            }}
            noOptionsText="No results"
            options={options}
            loading={loading}
            renderInput={(params) => <TextField {...params} label="Creator" />}
        />
    );
}