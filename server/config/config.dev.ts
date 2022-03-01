import { ConfigServer } from '@app/interfaces/config.server'

const config: ConfigServer = {

    /* 接口请求相关配置 */
    requestTimeout: 300000,

    // 代理接口
    apiPrefix: {
        baseApi: 'http://ufw.dev1.qlchat.com',
        innerCouponApi: 'http://inner.coupon.dev1.qlchat.com',
        innerApi: 'http://inner.dev1.qlchat.com',

    },

    /* redis相关配置 */
    redisExpire: 60 * 60 * 24,

    redisConf: {
        'port': 63791,
        'host': '211.159.219.193',
        'no_ready_check': true,
        'password': 'WdPTMj6X',
        'username': '...'
    },

    lruMaxAge: 1,

    lruMax: 1,

    /* 微信相关配置 */
    wxOpenAppId: 'wxc2b795ed9de3592a',

    // APP 携带的信息
    client_params_keys: ["caller", "os", "ver", "platform", "userId", "sid"],
}

module.exports = config;