"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateCheck = exports.blogInputCheck = exports.signInCheck = exports.signUpCheck = void 0;
const zod_1 = require("zod");
exports.signUpCheck = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional(),
});
exports.signInCheck = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.blogInputCheck = zod_1.z.object({
    title: zod_1.z.string().min(1),
    content: zod_1.z.string().min(10),
});
exports.blogUpdateCheck = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    id: zod_1.z.string(),
    published: zod_1.z.boolean().optional(),
});
