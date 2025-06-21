"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_DEV_ENV = exports.isDev = void 0;
const dotenv = require("dotenv");
dotenv.config();
const isDev = (configService) => configService.getOrThrow('NODE_ENV') === 'development';
exports.isDev = isDev;
exports.IS_DEV_ENV = process.env.NODE_ENV === 'development';
//# sourceMappingURL=is-dev.util.js.map