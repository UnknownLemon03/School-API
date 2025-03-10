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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSchool = addSchool;
exports.getSchool = getSchool;
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient();
function addSchool(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = { error: "", success: true };
        try {
            res.data = yield Prisma.school.create({
                data
            });
        }
        catch (e) {
            if (e instanceof Error)
                res.error = e.message;
            else
                res.error = "something went wrong !!!";
            console.log(e);
            res.success = false;
        }
        return res;
    });
}
function getSchool(lat, lan) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = { error: "", data: [], success: true };
        try {
            res.data = yield Prisma.school.findMany();
        }
        catch (e) {
            if (e instanceof Error)
                res.error = e.message;
            else
                res.error = "something went wrong !!!";
            console.log(e);
            res.success = false;
        }
        return res;
    });
}
