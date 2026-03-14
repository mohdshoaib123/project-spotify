import type { NextFunction, Request, Response } from "express";
interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    playlist: string[];
}
interface Authenticate extends Request {
    user?: IUser | null;
}
export declare const isAuth: (req: Authenticate, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const uploadfile: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export {};
//# sourceMappingURL=middleware.d.ts.map