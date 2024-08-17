import downloadIcon from "/public/download.svg";
import Image from "next/image";
import { FullDecal } from "@/utils/data-utils";
import { getDecalImageUrl } from "@/utils/utils";
import { CopyTextBox } from "./CopyTextBox";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";

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

    const [url, setUrl] = useState("");
    useEffect(() => {
        setUrl(window.location.origin + "?decal=" + decal.id);
    }, []);

    const idString = decal.id.toString();
    const svgUrl = getDecalImageUrl(idString);

    const keywordTrim = decal.keyword?.trim();
    const keywords = keywordTrim ? keywordTrim.split(" ") : [];

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className="justify-center"
            aria-labelledby="decal-modal-title"
            aria-describedby="decal-modal-description"
        >
            <Box
                className="container-modal outline-none absolute top-1/2 -translate-y-1/2 h-full max-h-[48rem]"
            >

                <div className="bg-dark-gray flex flex-col h-full">
                    <div className="flex items-center justify-center w-full h-min bg-light-gray">
                        <Image
                            src={svgUrl}
                            alt={decal.title ?? ""}
                            width={600}
                            height={400}
                            unoptimized={true}
                            style={{ objectFit: 'contain' }}
                            className="aspect-3/2"
                        />
                    </div>

                    <div className="flex flex-col w-full p-4 lg:p-8">
                        <h3 className="text-white text-3xl font-bold word-break">
                            {decal.title}
                        </h3>
                        <p className="text">By: {decal.user.name}</p>
                        <a href={svgUrl} className="size-5 flex-shrink-0" target="_blank" download={`${decal.title} - ${idString}`}>
                            <Image
                                src={downloadIcon}
                                alt="Download icon"
                            />
                        </a>
                    </div>

                    <span>{decal.comment}</span>

                    <div>
                        {...keywords.map(keyword => (
                            <span
                                className="mr-2 bg-slate-800"
                                key={keyword}
                            >
                                {keyword}
                            </span>
                        ))}
                    </div>

                    <span>{decal.create_time.toString()}</span>

                    <div className="w-1/2 ml-4">
                        <CopyTextBox text={url} />
                    </div>

                </div>

            </Box>
        </Modal>
    );
}