import { decalInclude, searchDecals, decalSortOptions } from "@/app/lib/data";
import { NextRequest } from "next/server";

export const DECAL_SEARCH_LIMIT = 150;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query') ?? ''
    const creator = searchParams.get('creator')
    const after = searchParams.get('after')
    
    // const sort = (searchParams.get('sort') || "default") as keyof typeof decalSortOptions;

    const results = await searchDecals(query, {
        max: DECAL_SEARCH_LIMIT,
        creator,
        after: after ? BigInt(after) : undefined,
        // sort: decalSortOptions[sort]
        sort: decalSortOptions.default
    });

    return Response.json({ results });
}