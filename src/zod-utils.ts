import { z } from "zod";

export const ParseBigInt = (value: string, ctx: z.RefinementCtx) => {
    try {
        return BigInt(value);
    } catch ( error ) {
        ctx.addIssue( {
            code: 'invalid_type',
            expected: 'unknown',
            received: "nan",
            message: `Error parsing BigInt`,
        } )
    }
}