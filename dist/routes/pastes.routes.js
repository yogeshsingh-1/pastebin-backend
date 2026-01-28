"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNow = getNow;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../models/index"));
const nanoid_1 = require("nanoid");
const zodValidate_1 = require("../middlewares/zodValidate");
const pastes_validation_1 = require("../validation/pastes.validation");
const router = express_1.default.Router();
// Create a new paste
router.post("/pastes", (0, zodValidate_1.validate)(pastes_validation_1.createPasteSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, title, max_views, ttl_seconds } = req.body;
        const slug = (0, nanoid_1.nanoid)(6);
        const expiresAt = ttl_seconds ? new Date(Date.now() + ttl_seconds * 1000) : null;
        yield index_1.default.Paste.create({
            slug,
            content,
            title,
            max_views,
            expiresAt,
        });
        ;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-disposition", "inline");
        const rawIp = req.ip;
        const ip = (rawIp === null || rawIp === void 0 ? void 0 : rawIp.startsWith("::ffff:"))
            ? rawIp.slice(7)
            : rawIp !== null && rawIp !== void 0 ? rawIp : "unknown";
        return res.status(201).json({
            "id": slug,
            ip,
            "url": `https://your-app.vercel.app/p/${slug}`
        });
        // return res.status(201).json({ message: "Paste created", slug });
    }
    catch (error) {
        return next(error);
    }
}));
// Get a paste by slug
router.get("/pastes/:slug", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { slug } = req.params;
        const paste = yield index_1.default.Paste.findOne({ where: { slug } });
        if (!paste) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "PASTE_NOT_AVAILABLE",
                    message: "The requested paste is no longer available",
                },
            });
        }
        //  USE HERE (expiry logic only)
        const now = getNow(req);
        if (paste.expiresAt && paste.expiresAt < now) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "PASTE_NOT_AVAILABLE",
                    message: "The requested paste is no longer available",
                },
            });
        }
        const remainingViews = paste.max_views !== null
            ? paste.max_views - paste.viewcount
            : null;
        if (remainingViews !== null && remainingViews <= 0) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "PASTE_NOT_AVAILABLE",
                    message: "The requested paste is no longer available",
                },
            });
        }
        paste.viewcount += 1;
        yield paste.save();
        return res.status(200).json({
            content: paste.content,
            remaining_views: paste.max_views !== null
                ? paste.max_views - paste.viewcount
                : null,
            expires_at: (_a = paste.expiresAt) !== null && _a !== void 0 ? _a : null,
        });
    }
    catch (error) {
        return next(error);
    }
}));
function getNow(req) {
    if (process.env.TEST_MODE === "1" &&
        req.headers["x-test-now-ms"]) {
        const ms = Number(req.headers["x-test-now-ms"]);
        if (!Number.isNaN(ms)) {
            return new Date(ms);
        }
    }
    return new Date();
}
exports.default = router;
