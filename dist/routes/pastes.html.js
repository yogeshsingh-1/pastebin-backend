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
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../models/index"));
const pastes_routes_1 = require("./pastes.routes");
const router = express_1.default.Router();
router.get("/:slug", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const paste = yield index_1.default.Paste.findOne({
            where: { slug }
        });
        if (!paste) {
            return res.status(404).json({
                success: false,
                reason: "NOT_FOUND",
            });
        }
        const now = (0, pastes_routes_1.getNow)(req);
        if (paste.expiresAt && paste.expiresAt < now) {
            return res.status(404).json({
                success: false,
                reason: "EXPIRED",
            });
        }
        if (paste.max_views !== null && paste.viewcount >= paste.max_views) {
            return res.status(404).json({
                success: false,
                reason: "VIEW_LIMIT",
            });
        }
        paste.viewcount += 1;
        yield paste.save();
        return res.status(200).json({
            success: true,
            content: paste.content,
        });
    }
    catch (e) {
        return next(e);
    }
}));
exports.default = router;
