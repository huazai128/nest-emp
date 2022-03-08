import { Request } from 'express'
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getServerIp } from '@app/utils/util';
import { config } from '@app/config';

export interface ParamsVisitor {
    ip: string | null
    ua?: string
    origin?: string
    referer?: string
}

export interface ParamsCookies {
    [key: string]: any
}

export interface ParamsResult {
    body: Record<string, string>
    params: Record<string, string>
    query: Record<string, string>
    cookies: ParamsCookies
    visitor: ParamsVisitor
    request: Request
}
/**
 * Params 自定义装饰器，请求方法解析参数
 * @function Params
 * @example `@Params()`
 * @example `@Params('query')`
 */
export const Params = createParamDecorator((field: keyof ParamsResult, ctx: ExecutionContext): ParamsResult => {
    const request = ctx.switchToHttp().getRequest<Request>();

    // 获取IP
    const ip = getServerIp()

    const visitor: ParamsVisitor = {
        ip: ip.replace('::ffff:', '').replace('::1', '') || null,
        ua: request.headers['user-agent'],
        origin: request.headers.origin,
        referer: request.headers.referer,
    }

    const reqData = request.query || request.params || request.body
    const apiTransferType: any = reqData.apiTransferType || 'baseApi'
    const data = reqData.transferData || {}
    const transferUrl = reqData.transferUrl || {}
    const url = config.apiPrefix[apiTransferType] + transferUrl

    const result = {
        params: request.params.transferUrl ? { url, data } : {},
        query: request.query.transferUrl ? { url, data } : {},
        body: request.body.transferUrl ? { url, data } : {},
        cookies: request.cookies,
        visitor,
        request,
    }

    return field ? result[field] : result
})