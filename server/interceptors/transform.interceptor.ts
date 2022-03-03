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

export interface HttpResponse<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, HttpResponse<T> | Response>
{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<HttpResponse<T> | Response> {
        const res = context.switchToHttp().getResponse()
        // console.log('响应拦截器数据，此时可以对数据进行处理哈')
        return next.handle()
            .pipe(
                map(data => {
                    return res.render(join(__dirname, "../../client/index.html"), data)
                }),
            );
    }
}
