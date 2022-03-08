import { Request } from 'express'
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getServerIp } from '@app/utils/util';

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
    params: Record<string, string>
    query: Record<string, string>
    cookies: QueryCookies
    visitor: QueryVisitor
    request: Request
}
/**
 * QueryParams 自定义装饰器，get请求方法解析参数
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

    const result = {
        params: request.params,  // 
        query: request.query as any,
        cookies: request.cookies,
        visitor,
        request,
    }
    console.log(field,)

    return field ? result[field] : result
})