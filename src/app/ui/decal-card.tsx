import Image from "next/image";
import { getDecalImageUrl } from "../lib/utils";
import { FullDecal } from "../lib/data";

export default function ResultCard({ decal }: { decal: FullDecal }) {
    const idString = decal.id.toString();
    const svgUrl = getDecalImageUrl(idString);

    return (
            
		<div className="flex flex-col border-border-gray border-2 h-full">
			<div className="flex items-center justify-center aspect-3/2 p-4 bg-light-gray">
				<Image src={svgUrl}
					alt="Decal"
					width={300}
					height={200}
					style={{objectFit: 'contain'}}
					className="aspect-3/2"
						/>
			</div>
			
			<div className="p-4 border-t-border-gray border-t-2 flex h-full">
				<div className="flex flex-col justify-between h-full w-full">
					<h3 className="text-2xl font-medium word-break">{decal.title}</h3>
					<div className="flex justify-between w-full">
						<p className="text">By: {decal.user.name}</p>
						<a href={svgUrl} className="size-5 flex-shrink-0" target="_blank" download={`${decal.title} - ${idString}`}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#ffffff" d="M16 480c-8.8 0-16-7.2-16-16s7.2-16 16-16l352 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L16 480zM203.3 379.3c-6.2 6.2-16.4 6.2-22.6 0l-128-128c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L176 329.4 176 224l0-176c0-8.8 7.2-16 16-16s16 7.2 16 16l0 176 0 105.4L308.7 228.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-128 128z"/></svg>
						</a>
					</div>
				</div>
				
			</div>
		</div>
    );
}