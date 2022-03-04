import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express'

export interface HttpResponse<T> {
    data: T;
}

/**
 * 此处指拦截接口请求, 处理接口返回
 * @export
 * @class TransformInterceptor
 * @implements {NestInterceptor<T, HttpResponse<T>>}
 * @template T
 */
@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, HttpResponse<T>>
{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<HttpResponse<T>> {
        const req = context.switchToHttp().getRequest<Request>();
        const isApi = req.url.includes('/api/')
        const res = context.switchToHttp().getResponse<Response>()
        if (!isApi) {
            res.type('html');
        }
        return next.handle()
            .pipe(
                map((data) => ({ data }))
            );
    }
}
