import type { NextFunction, Request, Response } from 'express';
import { type IUser } from './model.js';
export interface AuthenticateRequest extends Request {
    user?: IUser | null;
}
export declare const isAuth: (req: AuthenticateRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=middleware.d.ts.map