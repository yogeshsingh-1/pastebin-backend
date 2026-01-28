"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ quiet: true });
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const pastes_routes_1 = __importDefault(require("./routes/pastes.routes"));
const pastes_html_1 = __importDefault(require("./routes/pastes.html"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
require("./app");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, cors_1.default)({ origin: true }));
app.use("/api", pastes_routes_1.default);
app.use("/p", pastes_html_1.default);
app.get("/", (req, res) => {
    return res.send("request is completed in pastedbin");
});
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
