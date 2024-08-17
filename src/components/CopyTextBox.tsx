import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRef } from "react";

export interface CopyTextBoxProps {
    text: string
}

export function CopyTextBox(
    { 
        text 
    }: CopyTextBoxProps
) {

    const inputRef = useRef<any>(null);

    function selectAndCopy () {
        if (inputRef.current) {
            inputRef.current.select();
            navigator.clipboard.writeText(inputRef.current.value)
        }
    };

    return (
        <Paper
            component="form"
            className="flex items-center"
            sx={{ p: '2px 4px' }}
        >

            <InputBase
                className="flex-1 ml-2"
                value={text}
                inputProps={{ }}
                inputRef={inputRef}
                onClick={selectAndCopy}
                readOnly
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
                color="primary"
                aria-label="copy"
                onClick={selectAndCopy}
            >
                <ContentCopyIcon />
            </IconButton>

        </Paper>
    );

}