"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    try {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            throw result.error;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validate = validate;
