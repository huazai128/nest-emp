import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { RedisCacheStore } from "./redis.store";
import { Cache } from 'cache-manager'

@Injectable()
export class RedisServer {
    public cacheStore!: RedisCacheStore
    private isReadied = false

    constructor(@Inject(CACHE_MANAGER) cacheManager: Cache) {
        this.cacheStore = cacheManager.store as RedisCacheStore
        this.cacheStore.client.on('connect', () => {
            console.info('[Redis]', 'connecting...')
        })
        this.cacheStore.client.on('reconnecting', () => {
            console.warn('[Redis]', 'reconnecting...')
        })
        this.cacheStore.client.on('ready', () => {
            this.isReadied = true
            console.info('[Redis]', 'readied!')
        })
        this.cacheStore.client.on('end', () => {
            this.isReadied = false
            console.error('[Redis]', 'Client End!')
        })
        this.cacheStore.client.on('error', (error) => {
            this.isReadied = false
            console.error('[Redis]', `Client Error!`, error.message)
        })
        this.cacheStore.client.connect()
    }
}