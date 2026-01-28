"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errorHandler = (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        const fieldErrors = {};
        error.issues.forEach((e) => {
            const field = e.path[0];
            if (!fieldErrors[field]) {
                fieldErrors[field] = e.message;
            }
        });
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: fieldErrors,
        });
    }
    return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
};
exports.default = errorHandler;
