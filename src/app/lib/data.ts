import { Decal } from "@prisma/client";
import prisma from "./prisma";

export async function searchDecals(
    query: string,
    max: number = 50
): Promise<Decal[]> {

    const results = await prisma.decal.findMany({
        where: {
            title: {
                contains: query
            }
        },
        take: max
    });

    return results;

}