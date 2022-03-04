import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Response } from 'express'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { join } from 'path'
import logger from '@app/utils/logger';
import { renderHtml } from '@app/utils/render';

export interface HttpResponse<T> {
    data: T;
}

/**
 * 此处指拦截接口请求
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
        const res = context.switchToHttp().getResponse()
        const req = context.switchToHttp().getRequest<Request>();
        return next.handle()
            .pipe(
                map((data) => {
                    return ({ data })
                }),
            );
    }
}
