import { action, observable } from 'mobx'
import { StoreExt } from '@src/utils/reactExt';
import { routerStore } from '..';

export class AuthStore extends StoreExt {

    @observable userInfo = {}

    @action
    getUserInfo = () => {
        this.api.auth.getUserInfo({
            transformUrl: '/api/getUserInfo',
            data: { name: 12, pass: 1212 }
        })
    }

    @action
    login = async (data: Record<string, string>) => {
        const res = await this.api.auth.login({
            apiUrl: '/api/login',
            transformUrl: '/auth/login',
            data: { ...data },
        })
        if (res.userId) {
            routerStore.history.push('/')
        }
    }
}

export default new AuthStore()