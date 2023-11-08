import {
    Inject,
    Injectable,
    Logger,
    LoggerService,
    NestMiddleware,
  } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as chalk from "chalk";
import * as moment from 'moment';
  
  @Injectable()
  export class LoggerMiddleware implements NestMiddleware {
    constructor(@Inject(Logger) private readonly logger: LoggerService) {}
  
    use(req: Request, res: Response, next: NextFunction) {
      // 요청 객체로부터 ip, http method, url, user agent를 받아온 후
      const { ip, method, originalUrl } = req;
      const userAgent = req.get('user-agent');
  
      // 응답이 끝나는 이벤트가 발생하면 로그를 찍는다.
      res.on('finish', () => {
        const { statusCode } = res;
        this.logger.log(
`
${chalk.cyanBright.bold(  moment().format("YYYY-DD-MM HH:mm:ss.SSS"))}
${chalk.yellow.bold("["+method+"]")}
${chalk.greenBright.bold.italic("PATH: ") + chalk.cyanBright.bold(originalUrl)}
${chalk.greenBright.bold.italic("BODY: ") + chalk.whiteBright.bold.underline(JSON.stringify(req.body))}
${chalk.greenBright.bold.italic("CODE: ") + chalk[statusCode === 200 ? "green" : statusCode < 400 ? "yellow" : "red"].bold(statusCode)}
${chalk.greenBright.bold.italic("IP: ") + chalk.white.bold(ip.split("::ffff:")[1])}
`,
        );
      });
      // ${chalk.userAgent}
      next();
    }
  }