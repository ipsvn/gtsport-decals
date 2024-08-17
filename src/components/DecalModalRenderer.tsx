"use client";

import { Fragment, useContext } from "react";
import { DecalModal } from "./DecalModal";
import { DecalModalContext } from "@/contexts/DecalModalContext";


export function DecalModalRenderer(
    
) {

    const modalState = useContext(DecalModalContext);

    console.log("modal renderer");

    return (
        <Fragment>
            {modalState?.decal && ( <DecalModal open={true} handleClose={() => modalState.setDecal(undefined)} decal={modalState.decal} /> )}
        </Fragment>
    )

}