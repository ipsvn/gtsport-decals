'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { decalSortOptions } from "@/app/lib/data-utils";

type SelectedSort = keyof typeof decalSortOptions;

export default function SidebarSortSelect() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [option, setOption] = useState<SelectedSort>(searchParams.get('sort')?.toString() ?? "default");

    const handleChange = (value: string) => {
        const newSelected = value as SelectedSort;

        setOption(newSelected);
        const params = new URLSearchParams(searchParams);
        params.set('sort', newSelected.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <FormControl className="w-full" size="small">
            <Select
                labelId="sidebar-sort-label"
                id="sidebar-sort"
                value={option}
                onChange={(event) => handleChange(event.target.value.toString())}
            >
                {Object.keys(decalSortOptions).map(it => (
                    <MenuItem
                        key={it}
                        value={it}
                    >
                        {decalSortOptions[it].name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}