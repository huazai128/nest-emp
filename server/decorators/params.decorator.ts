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
    const isAuthenticated = request.isAuthenticated()
    console.log(isAuthenticated, 'isAuthenticated')

    const visitor: QueryVisitor = {
        ip,
        ua: request.headers['user-agent'],
        origin: request.headers.origin,
        referer: request.headers.referer,
    }

    const result = {
        params: request.params,
        query: request.query,
        cookies: request.cookies,
        visitor,
        request,
    }

    return field ? result[field] : result
})