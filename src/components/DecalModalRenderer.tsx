"use client";

import { Fragment, useContext } from "react";
import { DecalModal } from "./decal-modal/DecalModal";
import { DecalModalContext } from "@/contexts/DecalModalContext";


export function DecalModalRenderer() {

    const modalState = useContext(DecalModalContext);

    return (
        <Fragment>
            {modalState?.decal && ( <DecalModal open={true} handleClose={() => modalState.setDecal(undefined)} decal={modalState.decal} /> )}
        </Fragment>
    )

}