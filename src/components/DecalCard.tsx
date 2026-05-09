import downloadIcon from "/public/download.svg";
import { DecalExcludingTags } from "@/utils/data-utils";
import { getDecalImageUrl } from "@/utils/utils";
import { Fragment } from "react";
import Image from "next/image";
import { useDecalModal } from "@/contexts/DecalModalContext";

export interface DecalCardProps {
	decal: DecalExcludingTags
}

export default function DecalCard(
	{
		decal
	}: DecalCardProps
) {
	const idString = decal.id.toString();
	const svgUrl = getDecalImageUrl(idString);

	const modal = useDecalModal();
	function handleModalOpen() {
		modal?.setDecal(decal);
	}

	return (
		<Fragment>
			<div className="flex flex-col border-white/20 border h-full">
				<div className="flex items-center justify-center aspect-3/2 p-4 relative bg-zinc-700">
					<div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
					<Image src={svgUrl}
						alt="Decal"
						width={300}
						height={200}
						unoptimized={true}
						style={{ objectFit: 'contain' }}
						className="aspect-3/2"
					/>
				</div>

				<div className="p-4 border-white/20 border-t flex h-full">
					<div className="flex flex-col justify-between h-full w-full">
						<a
							role="button"
							onClick={handleModalOpen}
						>
							<h3 className="text-2xl break-words">
								{decal.title}
							</h3>
						</a>
						<div className="flex font-sans font-light justify-between w-full text-zinc-400">
							<p className="text">By: {decal.user.name}</p>
							<a href={svgUrl} className="size-5 flex-shrink-0" target="_blank" download={`${decal.title} - ${idString}`}>
								<Image
									src={downloadIcon}
									alt="Download icon"
								/>
							</a>
						</div>
					</div>
				</div>
			</div>


		</Fragment>
	);
}