import { BackgroundProperties } from "./background";

import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

export interface DecalCloseButtonProps {
    background: BackgroundProperties;
    handleClose: () => void
}

export function DecalCloseButton(
    {
        background,
        handleClose
    }: DecalCloseButtonProps
) {
    return (
        <div className="absolute top-2 right-2 text-black p-2">
            <IconButton 
                aria-label="close"
                color={background.contrastColor}
                onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>
        </div>
    );
}