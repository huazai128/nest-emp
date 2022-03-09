import { isDevEnv } from "@app/app.env";
import { UnAuthStatus } from "@app/constants/error.constant";
import { ExceptionInfo, HttpResponseError, ResponseStatus } from "@app/interfaces/response.interface";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response, Request } from 'express'
import lodash from 'lodash'

/**
 * 错误拦截，可以针对接口、页面、权限等异常拦截进行处理
 * @export
 * @class HttpExceptionFilter
 * @implements {ExceptionFilter}
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const isApi = request.url.includes('/api/')

        const errorResponse: ExceptionInfo = exception.getResponse() as ExceptionInfo
        const errorMessage = lodash.isObject(errorResponse) ? errorResponse.message : errorResponse
        const errorInfo = lodash.isString(errorResponse) ? null : errorResponse.error

        const data: HttpResponseError = {
            status: ResponseStatus.Error,
            message: errorMessage,
            error: errorInfo?.message || (lodash.isString(errorInfo) ? errorInfo : JSON.stringify(errorInfo)),
            debug: isDevEnv ? errorInfo?.stack || exception.stack : 0,
        }


        // default 404
        if (status === HttpStatus.NOT_FOUND) {
            data.error = data.error || `Not found`
            data.message = data.message || `Invalid API: ${request.method} > ${request.url}`
        }

        const isUnAuth = UnAuthStatus.includes(status)

        return isApi ?
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            }) : response.redirect(isUnAuth ? 'login' : 'error')
    }
}