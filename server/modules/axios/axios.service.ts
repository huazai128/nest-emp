import { isDevEnv } from "@app/app.env";
import logger from "@app/utils/logger";
import { AXIOS_INSTANCE_TOKEN } from "@app/constants/axios.constant";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";

/**
 * 没有使用@nest/axios 是因为rxjs版本不一样导致调用接口没有出发请求
 * @export
 * @class AxiosService
 */
@Injectable()
export class AxiosService {

    constructor(@Inject(AXIOS_INSTANCE_TOKEN) readonly instance: AxiosInstance = Axios) { }

    public get<T = any>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.makeObservable<T>(this.instance.get, url, config);
    }

    public post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.makeObservable<T>(this.instance.post, url, data, config);
    }

    protected makeObservable<T>(
        axios: (...args: any[]) => AxiosPromise<T>,
        ...args: any[]
    ): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = { ...(args[args.length - 1] || {}) };

        let cancelSource: CancelTokenSource;
        if (!config.cancelToken) {
            cancelSource = Axios.CancelToken.source();
            config.cancelToken = cancelSource.token;
        }
        // 请求拦截
        this.instance.interceptors.request.use(
            cfg => {
                cfg.params = { ...cfg.params, ts: Date.now() / 1000 }
                return cfg
            },
            error => Promise.reject(error)
        )

        // 响应拦截
        this.instance.interceptors.response.use(
            response => {
                const rdata = response.data
                if (rdata.code == 200 || rdata.code == 0) {
                    return rdata.result
                } else {
                    return Promise.reject({
                        msg: rdata.message || '转发接口错误',
                        errCode: rdata.code || HttpStatus.BAD_REQUEST,
                        config: response.config
                    })
                }
            },
            error => {
                const msg = error.response && ((error.response.data && error.response.data.error) || error.response.statusText)
                return Promise.reject({
                    msg: msg || error.message || 'network error',
                    errCode: HttpStatus.BAD_REQUEST,
                    config: error.config
                })
            }
        )
        return axios(...args)
            .then(res => res)
            .catch((err) => {
                if (isDevEnv) {
                    logger.error(err)
                }
                throw new HttpException({
                    status: err.errCode,
                    message: err.msg || err.stack
                }, err.errCode)
            })

    };
}