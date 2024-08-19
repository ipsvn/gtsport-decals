// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import { useState } from 'react';

import { Checkbox } from "@mui/material";

export type ExcludeCheckboxState = "neutral" | "required" | "excluded";
export const nextCheckboxState: Record<ExcludeCheckboxState, ExcludeCheckboxState> = {
    neutral: "required",
    required: "excluded",
    excluded: "neutral",
};

export interface ExcludeCheckboxProps {
    className?: string;
    state: ExcludeCheckboxState;
}

export function ExcludeCheckbox(
    {
        className,
        state
    }: ExcludeCheckboxProps
) {

    return (
        <Checkbox
            className={className}
            checked={state == "required"}
            indeterminate={state == "excluded"}
        />
    );

}

// export interface ExcludeCheckboxProps {

// }

// export function ExcludeCheckbox() {
//     const [state, setState] = useState<ExcludeCheckboxState>("neutral");

//     const handleChange = () => {
//         setState(nextCheckboxState[state]);
//     };

//     return (
//         <div>
//             <FormControlLabel
//                 label="Parent"
//                 control={
//                     <Checkbox
//                         checked={state == "required"}
//                         indeterminate={state == "excluded"}
//                         onChange={handleChange}
//                     />
//                 }
//             />

//         </div>
//     );
// }