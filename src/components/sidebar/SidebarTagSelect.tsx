"use client";

import { GTSPORT_TAGS_MAP } from "@/constants";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Fragment, useState } from "react";
import { ExcludeCheckbox, ExcludeCheckboxState, nextCheckboxState } from "../exclude/ExcludeCheckbox";
import { Box, Chip } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SidebarTagSelectProps {

};

type SelectStates = { [key: string]: ExcludeCheckboxState };

export default function SidebarTagSelect(
    {
        
    }: SidebarTagSelectProps
) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const values = GTSPORT_TAGS_MAP;

    const initialStates = () => {
        const initialState: SelectStates = {};
        searchParams.get('tage')?.split(",").forEach(it => initialState[it] = "excluded");
        searchParams.get('tagr')?.split(",").forEach(it => initialState[it] = "required");
        return initialState;
    };

    const [states, setStates] = useState<SelectStates>(initialStates);

    const passedStates = Object.keys(states).filter(it => states[it] != "neutral");

    const handleChange = (_: SelectChangeEvent<typeof passedStates>, option: any) => {

        const selected = option.props["value"];
        if (!selected) {
            return;
        }

        const current = states[selected] ?? "neutral";
        const next = nextCheckboxState[current];

        const newStates = {
            ...states,
        };
        newStates[selected] = next;
        
        setStates(newStates);
    };

    const updatePath = () => {
        const excludes = Object.keys(states).filter(it => states[it] == "excluded").join(",");
        const required = Object.keys(states).filter(it => states[it] == "required").join(",");

        const params = new URLSearchParams(searchParams);
        if (excludes) {
            params.set('tage', excludes);
        } else {
            params.delete('tage');
        }
        if (required) {
            params.set('tagr', required);
        } else {
            params.delete('tagr');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const handleClose = () => {
        updatePath();
        console.log("update path");
    };

    const renderValue = (selected: typeof passedStates) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {...selected.map(it => (
                <Chip color={states[it] == "excluded" ? "error" : "success"} key={it} label={values[it]} />
            ))}
        </Box>
    );


    return (
        <FormControl className="w-full" size="small">
            <InputLabel id="sidebar-tag-label">Tag</InputLabel>
            <Select
                labelId="sidebar-tag-label"
                id="sidebar-tag"
                multiple
                multiline={true}
                value={passedStates}
                renderValue={renderValue}
                onChange={handleChange}
                onClose={handleClose}
                input={<OutlinedInput label="Tag" />}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 250,
                            width: 250,
                        },
                    },
                }}
            >
                {
                    Object.keys(values).map((value) => (
                        <MenuItem key={value} value={value}>
                            <ExcludeCheckbox className="!p-0" state={states[value]} />
                            <ListItemText primary={values[value]} />
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl >
    );

}