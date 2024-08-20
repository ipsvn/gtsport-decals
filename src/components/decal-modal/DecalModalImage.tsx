import { DecalExcludingTags } from "@/utils/data-utils";
import { getDecalImageUrl } from "@/utils/utils";
import { BackgroundProperties } from "./background";

import Image from "next/image";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DownloadIcon from '@mui/icons-material/Download';
import PaletteIcon from '@mui/icons-material/Palette';

export interface DecalModalProps {
    decal: DecalExcludingTags;
    background: BackgroundProperties;
    cycleBackground: () => void
}

export function DecalModalImage(
    {
        decal,
        background,
        cycleBackground
    }: DecalModalProps
) {

    const idString = decal.id.toString();
    const svgUrl = getDecalImageUrl(idString);

    return (
        <div className={`w-full h-min transition-colors ${background.backgroundClasses}`}>
            
            <Image
                src={svgUrl}
                alt={decal.title ?? ""}
                width={600}
                height={400}
                unoptimized={true}
                style={{ objectFit: 'contain' }}
                className="aspect-3/2 m-auto"
            />

            <div className="absolute bottom-2 right-2">
                <ButtonGroup
                    color={background.contrastColor}
                    orientation="vertical"
                    aria-label="Image controls"
                >
                    <Button
                        key="background"
                        onClick={() => cycleBackground()}
                    >
                        <PaletteIcon />
                    </Button>

                    <Button
                        key="download"
                        href={svgUrl}
                        target="_blank"
                        download={`${decal.title} - ${idString}`}
                    >
                        <DownloadIcon />
                    </Button>,
                </ButtonGroup>
            </div>
            
        </div>
    );

}