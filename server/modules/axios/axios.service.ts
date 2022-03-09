import { AXIOS_INSTANCE_TOKEN } from "@app/constants/axios.constant";
import { Inject, Injectable } from "@nestjs/common";
import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import { Observable } from "rxjs";

@Injectable()
export class AxiosService {

    constructor(@Inject(AXIOS_INSTANCE_TOKEN) readonly instance: AxiosInstance = Axios) { }

    public get<T = any>(
        url: string,
        config?: AxiosRequestConfig,
    ): any {
        return this.makeObservable<T>(this.instance.get, url, config);
    }


    public post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): any {
        return this.makeObservable<T>(this.instance.post, url, data, config);
    }

    protected makeObservable<T>(
        axios: (...args: any[]) => AxiosPromise<T>,
        ...args: any[]
    ) {
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
                console.log(rdata, '=======')
                return rdata
            },
            error => {
                return Promise.reject({
                    msg: error.response.data.error || error.response.statusText || error.message || 'network error',
                    config: error.config
                })
            }
        )

        return axios(...args)
            .then(res => {
                console.log(res)
                return res
            })
            .catch((err) => {
                console.log(err)
            })

    };
}