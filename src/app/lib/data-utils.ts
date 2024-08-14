import { Prisma } from "@prisma/client";

export const decalInclude = {
    // tags: true,
    user: true
} satisfies Prisma.DecalSelect;

export type FullDecal = Prisma.DecalGetPayload<{
    include: typeof decalInclude
}>;

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
} as const;
