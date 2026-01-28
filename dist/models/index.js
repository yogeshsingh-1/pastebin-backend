"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const pastes_1 = __importDefault(require("./pastes"));
const db = {};
db.sequelize = database_1.default;
db.Sequelize = database_1.default.constructor;
db.Paste = (0, pastes_1.default)(database_1.default);
exports.default = db;
