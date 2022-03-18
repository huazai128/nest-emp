import { ConfigServer } from '@app/interfaces/config.interface'
import { redisConf } from '../../config'

const config: ConfigServer = {

    /* 接口请求相关配置 */
    requestTimeout: 300000,

    // 代理接口域名
    apiPrefix: {
        baseApi: 'http://172.25.197.154:3000',
    },

    /* redis相关配置 */
    redisExpire: 60 * 60 * 24,

    redisConf: {
        'port': redisConf.port,
        'host': redisConf.host,
        'no_ready_check': true,
        'password': redisConf.password,
    },

    lruMaxAge: 24 * 60 * 60 * 100,

    lruMax: 10,

    /* 微信相关配置 */
    wxOpenAppId: 'wxc2b795ed9de3592a',

    // APP 携带的信息
    client_params_keys: ["caller", "os", "ver", "platform", "userId", "sid"],
}

module.exports = config;
