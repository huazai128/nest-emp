import axios, { AxiosRequestConfig as _AxiosRequestConfig, Method } from 'axios'
import config from '@src/config'
import { message } from 'antd'

console.log(config, '====')
export interface AxiosRequestConfig extends _AxiosRequestConfig {
    startTime?: Date
}

export interface HttpParams {
    transfromUrl: string
    data: object | FormData
    otherConfig?: AxiosRequestConfig
}

enum HTTPERROR {
    LOGICERROR,
    TIMEOUTERROR,
    NETWORKERROR
}

// 判断请求是否成功
const isSuccess = (res: any) => (res.code === 200 || res.code === 0)
// 格式化返回结果
const resFormat = (res: any) => res.response || res.result || res || {}

function httpCommon<T>(method: Method, { data, otherConfig }: HttpParams): Promise<T | any> {
    let axiosConfig: AxiosRequestConfig = {
        method,
        url: '/api/transfrom',
        baseURL: config.apiHost,
    }

    data = { ...data, method } as HttpParams & { method: Method }

    const instance = axios.create()

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
            const rdata = typeof response.data === 'object' && !isNaN(response.data.length) ? response.data[0] : response.data
            if (!isSuccess(rdata)) {
                return Promise.reject({
                    msg: rdata.msg,
                    errCode: rdata.code,
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
            message.destroy()
            message.error(err.response || err.msg || err.stack || 'unknown error')
            return Promise.reject(err.msg || err.stack)
        })
}

function get<T>(data: HttpParams) {
    return httpCommon<T>('get', data)
}
function post<T>(data: HttpParams) {
    return httpCommon<T>('post', data)
}
function put<T>(data: HttpParams) {
    return httpCommon<T>('put', data)
}
function deleteHttp<T>(data: HttpParams) {
    return httpCommon<T>('delete', data)
}
function patch<T>(data: HttpParams) {
    return httpCommon<T>('delete', data)
}

export default {
    get,
    post,
    put,
    deleteHttp,
    patch
}