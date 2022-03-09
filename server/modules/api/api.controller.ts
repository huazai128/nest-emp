import { QueryParams, QueryParamsResult } from '@app/decorators/params.decorator';
import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import logger from '@app/utils/logger';

@Controller('api')
export class ApiConstroller {

    @Get('transfrom')
    getTransfrom(@QueryParams('query') data: QueryParamsResult) {
        return { userId: 12 }
    }

    @Post('transfrom')
    postTransfrom(@QueryParams('body') data: QueryParamsResult) {
        return { userId: 12 }
    }
}