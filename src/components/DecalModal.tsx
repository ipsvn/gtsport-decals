import Modal from "@mui/material/Modal";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FullDecal } from "@/utils/data-utils";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import { getDecalImageUrl } from "@/utils/utils";
import Image from "next/image";
import { Button } from "@mui/material";

export interface DecalModalProps {
    open: boolean,
    handleClose: () => void
    decal: FullDecal
}

export function DecalModal(
    {
        open,
        handleClose,
        decal
    }: DecalModalProps
) {

    const idString = decal.id.toString();
    const svgUrl = getDecalImageUrl(idString);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className="justify-center"
            aria-labelledby="decal-modal-title"
            aria-describedby="decal-modal-description"
        >
            <Box
                className="w-full max-w-[84rem] mx-auto outline-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full max-h-[48rem]"
            >

                <div className="bg-dark-gray lg:grid grid-cols-4 gap-4 h-full">
                    <div className="col-span-3 bg-slate-50 h-full">
                        <div className="flex items-center justify-center w-full h-full bg-light-gray">
                            <Image
                                src={svgUrl}
                                width={0}
                                height={0}
                                unoptimized={true}
                                className="w-full h-auto object-contain aspect-3/2"
                                style={{ objectFit: 'contain' }}
                                sizes="100vw"
                                alt="xd"
                            />
                        </div>

                    </div>
                    <div className="col-span-1">
                        {decal.title}
                        <Button href={svgUrl} className="size-5" target="_blank" download={`${decal.title} - ${idString}`}>I like penis</Button>
                    </div>
                </div>

            </Box>
        </Modal>
    );
}