import { action, observable } from 'mobx'

export class GlobalStore {
    @observable num = 1

    @action
    updateNum = () => {
        this.num += 1
    }
}

export default new GlobalStore();