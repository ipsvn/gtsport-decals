import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    if (!query)
    {
        return Response.json({ error: "parameter 'query' required" }, { status: 400 })
    }

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