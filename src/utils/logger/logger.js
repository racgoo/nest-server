"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var nest_winston_1 = require("nest-winston");
var winstonDaily = require("winston-daily-rotate-file");
var winston = require("winston");
var env = process.env.NODE_ENV;
var logDir = __dirname + '/../../../logs'; // log 파일을 관리할 폴더
var dailyOptions = function (level) {
    return {
        level: level,
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + "/".concat(level),
        filename: "%DATE%.".concat(level, ".log"),
        maxFiles: 30,
        zippedArchive: true, // 로그가 쌓이면 압축하여 관리
    };
};
// rfc5424를 따르는 winston만의 log level
// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
exports.logger = nest_winston_1.WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            level: env === 'production' ? 'http' : 'silly',
            // production 환경이라면 http, 개발환경이라면 모든 단계를 로그
            format: env === 'production'
                // production 환경은 자원을 아끼기 위해 simple 포맷 사용
                ? winston.format.simple()
                : winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike('프로젝트이름', {
                    prettyPrint: true, // nest에서 제공하는 옵션. 로그 가독성을 높여줌
                })),
        }),
        // info, warn, error 로그는 파일로 관리
        new winstonDaily(dailyOptions('info')),
        new winstonDaily(dailyOptions('warn')),
        new winstonDaily(dailyOptions('error')),
    ],
});
