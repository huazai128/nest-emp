import { action, observable } from 'mobx'
import { StoreExt } from '@src/utils/reactExt';

export class AuthStore extends StoreExt {

    @observable userInfo = {}


    @action
    getUserInfo = () => {
        this.api.auth.getUserInfo({
            transfromUrl: '/api/getUserInfo',
            data: { name: 12, pass: 1212 }
        })
    }

    @action
    login = (data: Record<string, string>) => {
        this.api.auth.login({
            transfromUrl: '/login',
            data: { data },
        })
    }
}

export default new AuthStore()