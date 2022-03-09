import { action, observable } from 'mobx'
import { StoreExt } from '@src/utils/reactExt';

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
    login = (data: Record<string, string>) => {
        this.api.auth.login({
            apiUrl: '/api/login',
            transformUrl: '/auth/login',
            data: { ...data },
        })
    }
}

export default new AuthStore()