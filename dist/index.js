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
const types_1 = require("./types");
const database_1 = require("./database");
const util_1 = require("./util");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/addSchool", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const valid = types_1.schooSchmen.safeParse(data);
        if (!valid.success) {
            const errorMessages = valid.error.issues.map(issue => {
                return `Field '${issue.path.join('.')}' ${issue.message}`;
            }).join("\n");
            throw new Error(errorMessages);
        }
        const { data: school } = yield (0, database_1.addSchool)(data);
        res.json({
            success: true,
            data: school,
            error: "",
        });
    }
    catch (e) {
        next(e);
    }
}));
app.get("/listSchools", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon)
            throw new Error("Provide latitude and longitude");
        const { data } = yield (0, database_1.getSchool)(parseFloat(lat), parseFloat(lon));
        const schools = (0, util_1.sortSchool)(data, { lan: parseFloat(lat), lat: parseFloat(lon) });
        res.json({
            success: true,
            data: schools,
            error: "",
        });
    }
    catch (e) {
        next(e);
    }
}));
app.use((err, req, res, next) => {
    const { status = 500, message = "Internal Server Error" } = err;
    return res.status(status).json({
        success: false,
        data: null,
        error: message,
    });
});
app.listen(3000, () => {
    console.log("API at 3000");
});
