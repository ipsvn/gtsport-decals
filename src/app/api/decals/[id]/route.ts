import { findDecal, searchDecals } from "@/lib/data";
import { decalSortOptions } from "@/utils/data-utils";
import { DECAL_MAX_RESULTS } from "@/constants";

import { NextRequest } from "next/server";
import { z } from "zod";
import { ParseBigInt } from "@/zod-utils";

const schema = z.object({
    id: z.string().transform(ParseBigInt),
});

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {   

    const response = schema.safeParse(params);

    if (!response.success) {
        const { errors } = response.error;
        return Response.json({ errors }, { status: 400 })
    }

    const {
        id
    } = response.data;

    const result = await findDecal(id);

    return Response.json({ result });
}
