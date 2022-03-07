
export interface ConfigServer {

    requestTimeout: number

    userId?: string

    apiPrefix: {
        baseApi: string,
    }

    /* redis相关配置 */
    redisExpire: number
    redisConf: {
        port: number,
        host: string,
        no_ready_check: boolean,
        password: string,
        defaultCacheTTL?: number
        username?: string
    }

    /* lru缓存相关配置 */
    lruMaxAge: number
    lruMax: number

    /* 微信相关配置 */
    wxOpenAppId?: string

    // app UA信息
    client_params_keys?: Array<string>
}
