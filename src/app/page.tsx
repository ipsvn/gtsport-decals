import { DecalModalRenderer } from "@/components/DecalModalRenderer";
import { MainPageLayout, MainPageLayoutParams } from "@/components/page/MainPageLayout";
import { DecalModalProvider } from "@/contexts/DecalModalContext";
import { findDecal } from "@/lib/data";
import {FullDecal } from "@/utils/data-utils";
import { ParseBigInt } from "@/zod-utils";
import { z } from "zod";

const decalSchema = z.string().transform(ParseBigInt).nullable();

interface PageParams extends MainPageLayoutParams {
    decal?: string
}

export default async function Page(
    {
        searchParams
    }: {
        searchParams: Promise<PageParams>
    }
) {

    const loadedParams = await searchParams;

    const decalId = decalSchema.safeParse(loadedParams.decal);

    let decal: FullDecal | undefined = undefined;
    if (decalId.success && decalId.data) {
        decal = await findDecal(decalId.data) ?? undefined;
    }

    return (
        <DecalModalProvider decal={ decal }>
            <MainPageLayout {...loadedParams} />
            <DecalModalRenderer />
        </DecalModalProvider>
    );
}
