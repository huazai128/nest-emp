import { REDIS } from '@app/config'
import { CacheModuleOptions, CacheOptionsFactory, Injectable } from '@nestjs/common'
import redisStore, { RedisStoreOptions } from './redis.store'

@Injectable()
export class RedisConfigServer implements CacheOptionsFactory {
    // 重试策略
    private retryStrategy(retries: number): number | Error {
        const errorMessage = ['[Redis]', `retryStrategy！retries: ${retries}`]
        // console.error(...(errorMessage as [any]))
        if (retries > 6) {
            return new Error('[Redis] 尝试次数已达极限！')
        }
        return Math.min(retries * 1000, 3000)
    }

    public createCacheOptions(): CacheModuleOptions<Record<string, any>> | Promise<CacheModuleOptions<Record<string, any>>> {
        const redisOptions: RedisStoreOptions = {
            socket: {
                host: REDIS.host as string,
                port: REDIS.port as number,
                reconnectStrategy: this.retryStrategy.bind(this),
            },
        }
        if (REDIS.username) {
            redisOptions.username = REDIS.username
        }
        if (REDIS.password) {
            redisOptions.password = REDIS.password
        }
        return {
            isGlobal: true,
            store: redisStore,
            redisOptions,
        }
    }
}