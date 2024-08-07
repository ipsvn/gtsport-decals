import Image from "next/image";
import { getDecalImageUrl } from "../lib/utils";
import { FullDecal } from "../lib/data";

export default function ResultCard({ decal }: { decal: FullDecal }) {
    const idString = decal.id.toString();
    const svgUrl = getDecalImageUrl(idString);

    return (

        <div className="mb-3">
            
            <div className="flex flex-col border-border-gray border-2">
                <div className="flex items-center justify-center aspect-3/2 p-4 bg-light-gray">
                    <Image src={svgUrl}
                        alt="Decal"
                        width="1024"
                        height="1024"
                        className="aspect-3/2"
                         />
                </div>
                
                <div className="p-4 border-t-border-gray border-t-2">
                    <h3 className="text-md font-bold">{decal.title}</h3>
                    <p className="text-sm">By: {decal.user.name}</p>
                </div>
            </div>

        </div>
    );
}