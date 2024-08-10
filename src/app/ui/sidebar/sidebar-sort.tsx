"use client"

import { decalSortOptions } from "@/app/lib/data";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
            <InputLabel id="sidebar-sort-label">Order</InputLabel>
            <Select
                labelId="sidebar-sort-label"
                id="sidebar-sort"
                value={option}
                label="Order"
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
        </FormControl >
    );
}