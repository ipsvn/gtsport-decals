"use client";

import { FullDecal } from "@/utils/data-utils";
import { Fragment, useContext, useState } from "react";
import { DecalModal } from "./DecalModal";
import { DecalModalContext } from "@/contexts/DecalModalContext";

interface DecalModalLoaderProps {
    decal: FullDecal
}

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