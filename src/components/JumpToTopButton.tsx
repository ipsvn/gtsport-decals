"use client";

import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export function JumpToTopButton() {
    return (
        <div className="fixed bottom-16 sm:right-16 right-4">
            <Fab
                color="primary"
                aria-label="jump to top"
                className=""
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </div>
    );
}