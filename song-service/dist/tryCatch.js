import { request } from "express";
export const tryCatch = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    };
};
//# sourceMappingURL=tryCatch.js.map