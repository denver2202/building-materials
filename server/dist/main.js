"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const connect_redis_1 = __importDefault(require("connect-redis"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const ms_util_1 = require("./libs/common/utils/ms.util");
const parse_boolean_utils_1 = require("./libs/common/utils/parse-boolean.utils");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const redis = new ioredis_1.default(config.getOrThrow('REDIS_URI'));
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const store = new RedisStore({
        client: redis,
        prefix: config.getOrThrow('SESSION_FOLDER')
    });
    app.use((0, cookie_parser_1.default)(config.getOrThrow('COOKIES_SECRET')));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true
    }));
    app.use((0, express_session_1.default)({
        secret: config.getOrThrow('SESSION_SECRET'),
        name: config.getOrThrow('SESSION_NAME'),
        resave: true,
        saveUninitialized: false,
        cookie: {
            domain: config.getOrThrow('SESSION_DOMAIN'),
            maxAge: (0, ms_util_1.ms)(config.getOrThrow('SESSION_MAX_AGE')),
            httpOnly: (0, parse_boolean_utils_1.parseBoolean)(config.getOrThrow('SESSION_HTTP_ONLY')),
            secure: (0, parse_boolean_utils_1.parseBoolean)(config.getOrThrow('SESSION_SECURE')),
            sameSite: 'lax'
        },
        store: store
    }));
    app.enableCors({
        origin: config.getOrThrow('ALLOWED_ORIGIN'),
        credentials: true,
        exposedHeaders: ['set-cookie']
    });
    await app.listen(config.getOrThrow('APPLICATION_PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map