import type { Request, Response } from "express";
export declare const addAlbum: (req: Request, res: Response, next: import("express-serve-static-core").NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addSong: (req: Request, res: Response, next: import("express-serve-static-core").NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addThumbnail: (req: Request, res: Response, next: import("express-serve-static-core").NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteAlbum: (req: Request, res: Response, next: import("express-serve-static-core").NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteSong: (req: Request, res: Response, next: import("express-serve-static-core").NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=controller.d.ts.map