import { type RequestHandler } from "express";
import type { NextFunction, Request, Response } from "express-serve-static-core";
export declare const tryCatch: (handler: RequestHandler) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=tryCatch.d.ts.map