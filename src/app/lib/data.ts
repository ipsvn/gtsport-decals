import { Prisma } from "@prisma/client";
import prisma from "./prisma";

export const decalInclude = {
    tags: true,
    user: true
} satisfies Prisma.DecalSelect;

export type FullDecal = Prisma.DecalGetPayload<{
    include: typeof decalInclude
}>;

export async function searchDecals(
    query: string,
    max: number = 50
): Promise<FullDecal[]> {

    const results = await prisma.decal.findMany({
        where: {
            title: {
                contains: query
            }
        },
        include: decalInclude,
        take: max
    });


    return results;

}