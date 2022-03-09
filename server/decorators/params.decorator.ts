import { Request } from 'express'
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getServerIp } from '@app/utils/util';
import { config } from '@app/config';

export interface QueryVisitor {
    ip: string | null
    ua?: string
    origin?: string
    referer?: string
}

export interface QueryCookies {
    [key: string]: any
}

export interface QueryParamsResult {
    body: Record<string, string>
    params: Record<string, string>
    query: Record<string, string>
    cookies: QueryCookies
    visitor: QueryVisitor
    request: Request
}
/**
 * QueryParams 自定义装饰器，请求方法解析参数
 * @function QueryParams
 * @example `@QueryParams()`
 * @example `@QueryParams('query')`
 */
export const QueryParams = createParamDecorator((field: keyof QueryParamsResult, ctx: ExecutionContext): QueryParamsResult => {
    const request = ctx.switchToHttp().getRequest<Request>();

    // 获取IP
    const ip = getServerIp()

    const visitor: QueryVisitor = {
        ip: ip.replace('::ffff:', '').replace('::1', '') || null,
        ua: request.headers['user-agent'],
        origin: request.headers.origin,
        referer: request.headers.referer,
    }

    const reqData = request.query || request.params
    const apiTransferType: any = reqData.apiTransferType || 'baseApi'
    const data = reqData.transferData || {}
    const transferUrl = reqData.transferUrl || {}
    const url = config.apiPrefix[apiTransferType] + transferUrl

    const result = {
        params: request.params.transferUrl ? { url, data } : {},
        query: request.query.transferUrl ? { url, data } : {},
        cookies: request.cookies,
        visitor,
        request,
    }

    return field ? result[field] : result
})