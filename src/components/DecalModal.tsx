import downloadIcon from "/public/download.svg";
import Image from "next/image";
import { DecalExcludingTags, FullDecal } from "@/utils/data-utils";
import { getDecalImageUrl } from "@/utils/utils";
import { CopyTextBox } from "./CopyTextBox";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { GTSPORT_TAGS_MAP } from "@/utils/gtsport-tags";

export interface DecalModalProps {
    open: boolean,
    handleClose: () => void
    decal: FullDecal | DecalExcludingTags
}

export function DecalModal(
    {
        open,
        handleClose,
        decal: initialDecal
    }: DecalModalProps
) {

    const [decal, setDecal] = useState(initialDecal);

    const idString = decal.id.toString();
    const svgUrl = getDecalImageUrl(idString);

    const keywordTrim = decal.keyword?.trim();
    const keywords = keywordTrim ? keywordTrim.split(" ") : [];

    const tags = (decal as FullDecal).tags !== undefined
        ? (decal as FullDecal).tags.map(t => t.tag)
        : undefined;

    const create_time = new Date(decal.create_time);

    const [loaded, setLoaded] = useState(tags !== undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
        if (loaded) return;

        (async () => {
        
            setLoading(true);

            const response = await fetch(`/api/decals/${decal.id}`);
            const json = await response.json();
            const result = json.result as FullDecal;
            setDecal(result);
            setLoaded(true);
            setLoading(false);

        })();

    }, [loaded]);

    const [url, setUrl] = useState("");
    useEffect(() => {
        setUrl(window.location.origin + "?decal=" + decal.id);
    }, [decal.id]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className="justify-center overflow-y-scroll"
            aria-labelledby="decal-modal-title"
            aria-describedby="decal-modal-description"
        >
            <Box
                className="container-modal outline-none absolute top-1/2 -translate-y-1/2 h-full max-h-[48rem]"
            >

                <div className="bg-dark-gray flex flex-col h-full overflow-y-scroll">
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
                        <div className="lg:flex justify-between">
                            <div className="flex flex-col">
                                <h3 className="text-white text-3xl font-bold word-break">
                                    {decal.title}
                                </h3>
                                <p className="text">
                                    By:{" "}
                                    <a href={`/?creator=${decal.user.name}`}>
                                        {decal.user.name}
                                    </a>
                                </p>
                            </div>
                            <div className="lg:w-1/2">
                                <CopyTextBox text={url} />
                            </div>
                        </div>
                        {/* <a href={svgUrl} className="size-5 flex-shrink-0" target="_blank" download={`${decal.title} - ${idString}`}>
                            <Image
                                src={downloadIcon}
                                alt="Download icon"
                            />
                        </a> */}

                        <div className="grid lg:grid-cols-2">
                            <div>
                                <div className="mt-2">
                                    <h1 className="text-white">
                                        Comment
                                    </h1>
                                    <span>
                                        {decal.comment}
                                    </span>
                                </div>


                                <div className="mt-2">
                                    <h1 className="text-white">
                                        Created at
                                    </h1>
                                    <span>
                                        {create_time.toLocaleDateString()} {create_time.toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1 className="text-white">
                                        Keywords
                                    </h1>
                                    {keywords.length > 0 ? keywords.map(keyword => (
                                        <span
                                            className="mr-2 bg-slate-800"
                                            key={keyword}
                                        >
                                            {keyword}
                                        </span>
                                    )) : (
                                        <span className="text-neutral-500 text-sm">
                                            No keywords
                                        </span>
                                    )}
                                </div>

                                <div className="mt-2">
                                    <h1 className="text-white">
                                        Tags
                                    </h1>
                                    {tags ? tags.map(tag => (
                                        <span
                                            className="mr-2 bg-slate-800"
                                            key={tag}
                                        >
                                            {GTSPORT_TAGS_MAP[tag]}
                                        </span>
                                    )) : (
                                        <span className="text-neutral-500 text-sm">
                                            No tags
                                        </span>
                                    )}
                                </div>

                                
                            </div>
                        </div>

                    </div>

                </div>

            </Box>
        </Modal>
    );
}