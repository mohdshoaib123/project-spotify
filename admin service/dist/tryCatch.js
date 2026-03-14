export const tryCatch = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ message: err.message });
        }
    };
};
//# sourceMappingURL=tryCatch.js.map