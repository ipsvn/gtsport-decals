import downloadIcon from "/public/download.svg";
import { FullDecal } from "@/utils/data-utils";
import { getDecalImageUrl } from "@/utils/utils";
import { Fragment } from "react";
import Image from "next/image";
import { useDecalModal } from "@/contexts/DecalModalContext";

export default function DecalCard({ decal }: { decal: FullDecal }) {
	const idString = decal.id.toString();
	const svgUrl = getDecalImageUrl(idString);

	const modal = useDecalModal();
	function handleModalOpen() {
		modal?.setDecal(decal);
	}

	return (
		<Fragment>
			<div className="flex flex-col border-border-gray border-2 h-full">
				<div className="flex items-center justify-center aspect-3/2 p-4 bg-light-gray">
					<Image src={svgUrl}
						alt="Decal"
						width={300}
						height={200}
						unoptimized={true}
						style={{ objectFit: 'contain' }}
						className="aspect-3/2"
					/>
				</div>

				<div className="p-4 border-t-border-gray border-t-2 flex h-full">
					<div className="flex flex-col justify-between h-full w-full">
						<a
							role="button"
							onClick={handleModalOpen}
						>
							<h3 className="text-2xl font-medium word-break">
								{decal.title}
							</h3>
						</a>
						<div className="flex justify-between w-full">
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