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
                        className="object-contain"
                         />
                </div>
                
                <div className="p-4 border-t-border-gray border-t-2 flex justify-between items-end">
					<div className="flex flex-col">
						<h3 className="text-md font-bold">{decal.title}</h3>
                    	<p className="text-sm">By: {decal.user.name}</p>
					</div>
                    <a href={svgUrl} className="size-6" target="_blank">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M16 480c-8.8 0-16-7.2-16-16s7.2-16 16-16l352 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L16 480zM203.3 379.3c-6.2 6.2-16.4 6.2-22.6 0l-128-128c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L176 329.4 176 224l0-176c0-8.8 7.2-16 16-16s16 7.2 16 16l0 176 0 105.4L308.7 228.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-128 128z"/></svg>
					</a>
                </div>
            </div>

        </div>
    );
}