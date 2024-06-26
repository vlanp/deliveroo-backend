"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var deliveroo_data_1 = __importDefault(require("./routes/deliveroo-data"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(deliveroo_data_1.default);
app.all("*", function (req, res) {
    res.status(404).json({ message: "This route does not exist" });
});
app.listen(process.env.PORT, function () {
    console.log("Server started");
});
