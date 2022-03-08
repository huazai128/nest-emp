import { Params, ParamsResult } from '@app/decorators/params.decorator';
import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import logger from '@app/utils/logger';

@Controller('api')
export class ApiConstroller {

    @Get('transfrom')
    getTransfrom(@Params('query') data: ParamsResult) {
        logger.info(data)
        return { userId: 12 }
    }

    @Post('transfrom')
    postTransfrom(@Params('body') data: ParamsResult) {
        return { userId: 12 }
    }
}