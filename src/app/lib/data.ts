import { Prisma } from "@prisma/client";
import prisma from "./prisma";

export const decalInclude = {
    // tags: true,
    user: true
} satisfies Prisma.DecalSelect;

export type FullDecal = Prisma.DecalGetPayload<{
    include: typeof decalInclude
}>;

type DecalCursorType = bigint | undefined;
export type DecalSortOption = {
    name: string,
    prismaOrder: Prisma.DecalOrderByWithAggregationInput
};
export const decalSortOptions: {
    [key: string]: DecalSortOption
} = {
    default: {
        name: "Default",
        prismaOrder: {
            id: "asc"
        }
    },
    // titleAsc: {
    //     name: "Title (Ascending)",
    //     prismaOrder: {
    //         title: "asc"
    //     }
    // },
    // titleDesc: {
    //     name: "Title (Descending)",
    //     prismaOrder: {
    //         title: "desc"
    //     }
    // },
    // timestampAsc: {
    //     name: "Timestamp (Ascending)",
    //     prismaOrder: {
    //         create_time: "asc"
    //     }
    // },
    // timestampDesc: {
    //     name: "Timestamp (Descending)",
    //     prismaOrder: {
    //         create_time: "desc"
    //     }
    // }
};

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