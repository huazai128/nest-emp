// 全局状态存储
import { RouterStore } from 'mobx-react-router'

export const routerStore = new RouterStore()

export { default as globalStore } from './GlobalStore'

export { default as testStore } from './TestStore'

export { default as authStore } from './AuthStore'
