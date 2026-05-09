import { findDecal } from "@/lib/data";

import { NextRequest } from "next/server";
import { z } from "zod";
import { ParseBigInt } from "@/zod-utils";

const schema = z.object({
    id: z.string().transform(ParseBigInt),
});

export async function GET(
    _: NextRequest,
    {
        params
    }: {
        params: Promise<{ id: string }>
    }
) {

    const loadedParams = await params;

    const response = schema.safeParse(loadedParams);

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
