import { AXIOS_INSTANCE_TOKEN } from "@app/constants/axios.constant";
import { CustomError } from "@app/errors/custom.error";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";

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
    ): Promise<AxiosResponse<T>> | any {
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
                        errCode: rdata.code || 0,
                        config: response.config
                    })
                }
            },
            error => {
                const msg = error.response && ((error.response.data && error.response.data.error) || error.response.statusText)
                return Promise.reject({
                    msg: msg || error.message || 'network error',
                    errCode: 502,
                    config: error.config
                })
            }
        )
        return axios(...args)
            .then(res => res)
            .catch((err) => {
                throw new HttpException({
                    status: err.errCode,
                    message: err.msg || err.stack
                }, err.errCode)
            })

    };
}