import prisma from "./prisma";
import { decalInclude, DecalSortOption, decalSortOptions, FullDecal } from "./data-utils";

type DecalCursorType = bigint | undefined;

interface SearchDecalsOptions {
    max?: number,
    after?: DecalCursorType,
    creator?: string | null | undefined,
    sort?: DecalSortOption
}

export async function searchDecals(
    query: string,
    options: SearchDecalsOptions = {}
): Promise<FullDecal[]> {

    const max = options.max || 50;
    const sort = options.sort || decalSortOptions.default
    const {
        after, creator
    } = options;

    const results = await prisma.decal.findMany({
        where: {
            ...(after && { id: { gt: after } }),

            OR: [
                {
                    title: {
                        contains: query
                    }
                },
                {
                    keyword: {
                        contains: query
                    },
                }
            ],

            ...(creator && { user: { name: { equals: creator } } })
        },
        orderBy: sort.prismaOrder,
        include: decalInclude,
        take: max
    });

    return results;

}