import prisma from "./prisma";
import { 
    decalExcludingTagsInclude, 
    DecalSortOption, 
    decalSortOptions, 
    DecalExcludingTags,
    fullDecalInclude,
    FullDecal
} from "@/utils/data-utils";

type DecalCursorType = bigint | undefined;

interface SearchDecalsOptions {
    max?: number,
    after?: DecalCursorType,
    creator?: string | null | undefined,
    sort?: DecalSortOption,

    exclude_tags?: string[],
    require_tags?: string[]
}

export async function findDecal(
    id: bigint,
): Promise<FullDecal | null> {

    const result = await prisma.decal.findFirst({
        where: {
            id: id
        },
        include: fullDecalInclude
    });

    return result;

}


export async function searchDecals(
    query: string,
    options: SearchDecalsOptions = {}
): Promise<DecalExcludingTags[]> {

    const max = options.max ?? 50;
    const sort = options.sort ?? decalSortOptions.default
    const {
        after, creator
    } = options;

    const exclude_tags = options.exclude_tags;
    const require_tags = options.require_tags;

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

            AND: [
                ...(require_tags?.map(t => ({ tags: { some: { tag: t } } })) ?? [])
            ],

            NOT: {
                AND: [
                    ...(exclude_tags?.map(t => ({ tags: { some: { tag: t } } })) ?? [])
                ]
            },

            ...(creator && { user: { name: { equals: creator } } })
        },
        orderBy: sort.prismaOrder,
        include: decalExcludingTagsInclude,
        take: max
    });

    return results;

}