import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
    query: z.string()
});

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const response = schema.safeParse({
        query: searchParams.get('query')
    });

    if (!response.success) {
        const { errors } = response.error;
        return Response.json({ errors }, { status: 400 })
    }

    const {
        query
    } = response.data;

    const results = await prisma.user.findMany({
        where: {
            name: {
                startsWith: query
            }
        },
        take: 25
    });

    return Response.json({ results });
}