import { isDevEnv } from "@app/app.env";
import logger from "@app/utils/logger";
import { UnAuthStatus } from "@app/constants/error.constant";
import { AXIOS_INSTANCE_TOKEN } from "@app/constants/axios.constant";
import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse, CancelTokenSource, Method } from "axios";

/**
 * https://github.com/nestjs/axios
 * 没有使用@nest/axios 是因为rxjs版本不一样导致调用接口没有出发请求（再次去看居然更新了rxjs, 先用自己这套吧）
 * @export
 * @class AxiosService
 */
@Injectable()
export class AxiosService {

    public get<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.makeObservable<T>('get', url, data, config);
    }

    public post<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.makeObservable<T>('post', url, data, config);
    }

    protected makeObservable<T>(
        method: Method,
        url: string,
        data: any,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {

        let axiosConfig: AxiosRequestConfig = {
            method,
            url,
        }

        const instance = axios.create()

        let cancelSource: CancelTokenSource;
        if (!axiosConfig.cancelToken) {
            cancelSource = axios.CancelToken.source();
            axiosConfig.cancelToken = cancelSource.token;
        }
        // 请求拦截  这里只创建一个，后续在优化拦截
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
                const rdata = response.data || {}
                console.log(rdata, 'rdata')
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
        if (method === 'get') {
            axiosConfig.params = data
        } else {
            axiosConfig.data = data
        }
        if (config) {
            axiosConfig = Object.assign(axiosConfig, config)
        }
        return instance
            .request(axiosConfig)
            .then((res: any) => res || {})
            .catch((err) => {
                if (isDevEnv) {
                    logger.error(err)
                }
                if (UnAuthStatus.includes(err.errCode)) {
                    throw new UnauthorizedException({
                        status: err.errCode,
                        message: err.msg || err.stack
                    }, err.errCode)
                } else {
                    throw new BadRequestException({
                        status: err.errCode,
                        message: err.msg || err.stack
                    }, err.errCode)
                }
            })

    };
}