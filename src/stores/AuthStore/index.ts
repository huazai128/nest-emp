import { action, observable } from 'mobx'
import { StoreExt } from '@src/utils/reactExt';

export class AuthStore extends StoreExt {

    @observable userInfo = {}

    @action
    login = () => {
        this.api.auth.login({
            transfromUrl: '/login',
            data: {},
        })
    }
}

export default new AuthStore()