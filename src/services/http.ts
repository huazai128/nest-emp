import axios, { AxiosRequestConfig as _AxiosRequestConfig, Method } from 'axios'
import config from '@src/config'

export interface AxiosRequestConfig extends _AxiosRequestConfig {
    startTime?: Date
}

export interface HttpParams {
    transfromUrl: string
    data: object | FormData
    otherConfig?: AxiosRequestConfig
    apiTransferType?: string // 对应其他域名，默认不添为baseApi
}

enum HTTPERROR {
    LOGICERROR,
    TIMEOUTERROR,
    NETWORKERROR
}

// 判断请求是否成功
const isSuccess = (res: any) => (Object.is(res.status, 'success'))
// 格式化返回结果
const resFormat = (res: any) => res.result || {}

function httpCommon<T>(method: Method, { data, otherConfig, ...otherData }: HttpParams): Promise<T | any> {
    let axiosConfig: AxiosRequestConfig = {
        method,
        url: '/api/transfrom',
        baseURL: config.apiHost,
    }

    const instance = axios.create()

    data = { ...otherData, transferData: data, }

    // 请求拦截
    instance.interceptors.request.use(
        cfg => {
            cfg.params = { ...cfg.params, ts: Date.now() / 1000 }
            return cfg
        },
        error => Promise.reject(error)
    )

    // 响应拦截
    instance.interceptors.response.use(
        response => {
            const rdata = response.data
            if (!isSuccess(response)) {
                return Promise.reject({
                    msg: rdata.message,
                    errCode: rdata.code || 0,
                    type: HTTPERROR[HTTPERROR.LOGICERROR],
                    config: response.config
                })
            }
            return resFormat(rdata)
        },
        error => {
            return Promise.reject({
                msg: error.response.data.error || error.response.statusText || error.message || 'network error',
                type: /^timeout of/.test(error.message) ? HTTPERROR[HTTPERROR.TIMEOUTERROR] : HTTPERROR[HTTPERROR.NETWORKERROR],
                config: error.config
            })
        }
    )
    if (method === 'get') {
        axiosConfig.params = data
    } else {
        axiosConfig.data = data
    }
    axiosConfig.startTime = new Date()
    if (otherConfig) {
        axiosConfig = Object.assign(axiosConfig, otherConfig)
    }
    return instance
        .request(axiosConfig)
        .then(res => res)
        .catch(err => {
            return Promise.reject(err.msg || err.stack)
        })
}

function get<T>(data: HttpParams) {
    return httpCommon<T>('get', data)
}
function post<T>(data: HttpParams) {
    return httpCommon<T>('post', data)
}

export default {
    get,
    post,
}