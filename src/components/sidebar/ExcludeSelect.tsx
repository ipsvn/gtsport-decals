// "use client";

// import Checkbox from "@mui/material/Checkbox";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import ListItemText from "@mui/material/ListItemText";
// import MenuItem from "@mui/material/MenuItem";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Select, { BaseSelectProps, SelectChangeEvent } from "@mui/material/Select";
// import { useState } from "react";
// import ExcludeCheckbox from "../exclude/ExcludeCheckbox";

// interface ExcludeSelectProps {
//     values: string[];
    
//     labelId?: string;

// };

// export default function ExcludeSelect(
//     props: ExcludeSelectProps
// ) {
    
//     const {
//         values
//     } = props;

//     const [personName, setPersonName] = useState<string[]>([]);

//     const handleChange = (event: SelectChangeEvent<typeof personName>) => {
//         const {
//             target: { value },
//         } = event;
//         setPersonName(
//             // On autofill we get a stringified value.
//             typeof value === 'string' ? value.split(',') : value,
//         );
//     };

//     return (
        
//     );

// }