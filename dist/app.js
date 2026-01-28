"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./models/index"));
try {
    index_1.default.sequelize
        .authenticate()
        .then(() => {
        console.log("Connection has been established successfully.");
    })
        .catch(() => { });
}
catch (error) {
    console.error("Unable to connect to the database:", error);
}
try {
    index_1.default.sequelize.sync({ alter: true }).then(() => { });
}
catch (error) {
    console.error("Unable to connect to the database:", error);
}
exports.default = index_1.default.sequelize;
