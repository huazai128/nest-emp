import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { getServerIp } from './utils/util';
import { join, resolve } from 'path';
import * as ejs from 'ejs'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // 使用模板引起
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.useStaticAssets(resolve(__dirname, '../../dist/client'), {
        // maxAge: 30 * 24 * 3600 * 1000 : 0,
        index: false,
        redirect: false,
    })
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('html');
    app.engine('html', ejs.renderFile);

    await app.listen(3002);
    console.log(`Application is running on: http://${getServerIp()}:3002`);
}
bootstrap();
