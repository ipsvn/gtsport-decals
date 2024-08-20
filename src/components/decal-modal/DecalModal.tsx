import { DecalExcludingTags, FullDecal } from "@/utils/data-utils";
import { GTSPORT_TAGS_MAP } from "@/utils/gtsport-tags";
import { Backgrounds, backgrounds, nextBackground } from "./background";

import { useEffect, useState } from "react";
import { CopyTextBox } from "../CopyTextBox";
import { DecalCloseButton } from "./DecalCloseButton";
import { DecalDetailComponent } from "./DecalDetailComponent";
import { DecalModalImage } from "./DecalModalImage";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Modal from "@mui/material/Modal";


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

    const keywordTrim = decal.keyword?.trim();
    const keywords = keywordTrim ? keywordTrim.split(" ") : [];

    const tags = (decal as FullDecal).tags !== undefined
        ? (decal as FullDecal).tags.map(t => t.tag)
        : undefined;

    const create_time = new Date(decal.create_time);

    const [loaded, setLoaded] = useState(tags !== undefined);
    const [loading, setLoading] = useState(false);

    const [background, setBackground] = useState<Backgrounds>("gray");
    const cycleBackground = () => setBackground(nextBackground[background]);
    const backgroundProps = backgrounds[background];

    useEffect(() => {

        if (loaded || loading) return;

        (async () => {

            setLoading(true);

            const response = await fetch(`/api/decals/${decal.id}`);
            const json = await response.json();
            const result = json.result as FullDecal;
            setDecal(result);
            setLoaded(true);
            setLoading(false);

        })();

    }, [loaded, loading]);

    const [url, setUrl] = useState("");
    useEffect(() => {
        setUrl(window.location.origin + "?decal=" + decal.id);
    }, [decal.id]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className="justify-center"
            aria-labelledby="decal-modal-title"
            aria-describedby="decal-modal-description"
        >
            <Box
                className="container-modal outline-none absolute top-1/2 -translate-y-1/2 "
            >

                <div className="bg-dark-gray flex flex-col max-h-screen overflow-y-scroll">

                    <div className="relative">
                        <DecalModalImage
                            decal={decal}
                            background={backgroundProps}
                            cycleBackground={cycleBackground}
                        />
                        <DecalCloseButton
                            background={backgroundProps}
                            handleClose={handleClose}
                        />
                    </div>

                    <div className="flex flex-col w-full p-4 lg:p-8">
                        <div className="grid lg:grid-cols-2">
                            
                            <div>
                                <h3 className="text-white text-3xl font-bold break-words">
                                    {decal.title}
                                </h3>
                                <p className="text text-neutral-400">
                                    By:{" "}
                                    <a href={`/?creator=${decal.user.name}`}>
                                        {decal.user.name}
                                    </a>
                                </p>
                            </div>

                            <CopyTextBox 
                                className="h-fit" 
                                text={url} 
                            />

                        </div>

                        <div className="grid gap-2 lg:grid-cols-2">
                            <div>

                                <DecalDetailComponent
                                    className="mt-2"
                                    title="Comment"
                                    data={decal.comment}
                                    hasData={!!decal.comment && decal.comment.trim().length > 0}
                                    noDataText="No comment"
                                    renderChild={(data) => (
                                        <span className="text-neutral-400">
                                            {data}
                                        </span>
                                    )}
                                />

                                <DecalDetailComponent
                                    className="mt-2"
                                    title="Created at"
                                    data={create_time}
                                    renderChild={(data) => (
                                        <span className="text-neutral-400">
                                            {data.toLocaleDateString()} {data.toLocaleTimeString()}
                                        </span>
                                    )}
                                />

                            </div>
                            <div>

                                <DecalDetailComponent
                                    title="Keywords"
                                    data={keywords}
                                    hasData={keywords.length > 0}
                                    noDataText="No keywords"
                                    renderChild={(data) => data.map(keyword => (
                                        <Chip
                                            key={keyword}
                                            label={keyword}
                                            size="small"
                                            className="mr-2"
                                        />
                                    ))}
                                />

                                <DecalDetailComponent
                                    className="mt-2"
                                    title="Tags"
                                    loading={loading}
                                    data={tags}
                                    hasData={tags !== undefined && tags.length > 0}
                                    noDataText="No tags"
                                    renderChild={(data) => data.map(tag => (
                                        <Chip
                                            key={tag}
                                            label={GTSPORT_TAGS_MAP[tag]}
                                            size="small"
                                            className="mr-2"
                                        />
                                    ))}
                                />

                            </div>
                        </div>

                    </div>

                </div>

            </Box>
        </Modal>
    );
}