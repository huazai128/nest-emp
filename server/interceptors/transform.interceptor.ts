import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import logger from '@app/utils/logger';

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
        return next.handle()
            .pipe(
                map((data) => {
                    console.log(data, '({ data })')
                    return ({ data })
                })
            );
    }
}
