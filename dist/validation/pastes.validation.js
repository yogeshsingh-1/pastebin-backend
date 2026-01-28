"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPasteSchema = void 0;
const zod_1 = require("zod");
exports.createPasteSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, "Content cannot be empty"),
    ttl_seconds: zod_1.z
        .number()
        .int("ttl_seconds must be an integer")
        .min(1, "ttl_seconds must be >= 1")
        .optional(),
    max_views: zod_1.z
        .number()
        .int("max_views must be an integer")
        .min(1, "max_views must be >= 1")
        .optional(),
});
