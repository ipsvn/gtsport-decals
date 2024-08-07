import { Decal } from "@prisma/client";
import Image from "next/image";
import { getDecalImageUrl } from "../lib/utils";

export default function ResultCard({ decal }: { decal: Decal }) {
    const idString = decal.id.toString();
    const svgUrl = getDecalImageUrl(idString);

    return (
        
        <div className="mb-3">
            <Image src={svgUrl}
                alt="Decal" 
                width="64"
                height="64" />
            <p className="text-lg">{decal.title}</p>
            <p className="text-sm">{decal.comment}</p>
        </div>
    );
}