"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schooSchmen = void 0;
const zod_1 = require("zod");
exports.schooSchmen = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, { message: "name is required" }),
    address: zod_1.z.string().trim().min(1, { message: "address is required" }),
    latitude: zod_1.z.number().min(1, { message: "latitude is required" }),
    longitude: zod_1.z.number().min(1, { message: "longitude is required" }),
});
