import type { RequestHandler, Request, Response } from "express";
import type { NextFunction } from "express-serve-static-core";
export declare const tryCatch: (handler: RequestHandler) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=tryCatch.d.ts.map