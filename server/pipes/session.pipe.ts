import { IRequest } from '@app/interfaces/request.interface';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';


/**
 * session 解析
 * @export
 * @class SessionPipe
 * @implements {PipeTransform<IRequest, IRequest>}
 */
@Injectable()
export class SessionPipe implements PipeTransform<IRequest, IRequest> {
    transform(req: IRequest, metadata: ArgumentMetadata): IRequest {
        const user = (req.session as any).user || {}
        req.isLogin = !!user.userId
        return req
    }
}