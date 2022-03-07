declare interface Window {
    INIT_DATA: any
}

/**
 * 全局Store
 * @interface IStore
 */
interface IStore {
    globalStore: IGlobalStore.GlobalStore
    authStore: IAuthStore.AuthStore
}