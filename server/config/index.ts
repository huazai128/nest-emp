import { resolve, join } from 'path'
import { environment } from '@app/app.env'
import { ConfigServer } from '@app/interfaces/config.server'

const conf = require(resolve(__dirname, `./config.${environment}`))

export const config: ConfigServer = conf

export const APP = {
    PORT: 8000,
    DEFAULT_CACHE_TTL: 60 * 60 * 24,
}

export const CROSS_DOMAIN = {
    allowedOrigins: ['https://admin-test.markiapp.com', 'https://admin.markiapp.com/', 'https://admin-release.markiapp.com/'],
    allowedReferer: 'markiapp.com',
}

export const REDIS = {
    host: config.redisConf.host,
    port: config.redisConf.port,
    username: config.redisConf.username,
    password: config.redisConf.password,
}

export const COOKIE_KEY = '@get-cookie-1212-dffas'