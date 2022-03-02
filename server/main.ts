import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { getServerIp } from '@app/utils/util';
import { join, resolve } from 'path';
import { isDevEnv } from '@app/app.env';
import rateLimit from 'express-rate-limit'
import { COOKIE_KEY, APP } from '@app/config';
import { Request } from 'express';
import { get } from 'lodash'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as morgan from 'morgan'
import * as ejs from 'ejs'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.useStaticAssets(resolve(__dirname, '../../dist/client'), {
        maxAge: !isDevEnv ? 30 * 24 * 3600 * 1000 : 0,
        index: false,
        redirect: false,
    })

    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('html');
    app.engine('html', ejs.renderFile);

    app.use(compression())
    app.use(bodyParser.json({ limit: '1mb' }))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(rateLimit({ max: 1000, windowMs: 15 * 60 * 1000 }))
    app.use(cookieParser(COOKIE_KEY))

    morgan.token('userId', (req: Request) => {
        return get(req, 'cookies.userId') || get(req, 'rSession.user.userId') || ''
    })
    app.use(morgan(':remote-addr - [:userId] - :remote-user ":method :url HTTP/:http-version" ":referrer" ":user-agent" :status :res[content-length] - :response-time ms'))

    await app.listen(APP.PORT);
    console.log(`Application is running on: http://${getServerIp()}:${APP.PORT}`);
}

bootstrap();
