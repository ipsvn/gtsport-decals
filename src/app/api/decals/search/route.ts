import { searchDecals } from "@/lib/data";
import { decalSortOptions } from "@/utils/data-utils";
import { DECAL_MAX_RESULTS } from "@/constants";

import { NextRequest } from "next/server";
import { z } from "zod";
import { ParseBigInt } from "@/zod-utils";

const [firstKey, ...otherKeys] = Object.keys(decalSortOptions)
const DecalSortOption = z.enum([firstKey, ...otherKeys])

const schema = z.object({
    query: z.string(),
    creator: z.string().nullable(),
    after: z.string().transform(ParseBigInt).nullable(),
    sort: DecalSortOption.nullable(),
    max: z.coerce.number().max(DECAL_MAX_RESULTS).default(DECAL_MAX_RESULTS)
});

export async function GET(request: NextRequest) {    
    const searchParams = request.nextUrl.searchParams;
    const response = schema.safeParse({
        query: searchParams.get('query'),
        creator: searchParams.get('creator'),
        after: searchParams.get('after'),
        sort: searchParams.get('sort'),
        max: searchParams.get('max') ?? undefined
    });

    if (!response.success) {
        const { errors } = response.error;
        return Response.json({ errors }, { status: 400 })
    }

    const {
        query,
        creator,
        after,
        sort,
        max
    } = response.data;

    const results = await searchDecals(query, {
        max,
        creator,
        after: after ?? undefined,
        sort: decalSortOptions[sort ?? "default"]
    });

    return Response.json({ results });
}
