import { QueryParams, QueryParamsResult } from '@app/decorators/queryparams.decorator';
import logger from '@app/utils/logger';
import { Controller, Get, Body, Param, Post } from '@nestjs/common';


@Controller('api')
export class ApiConstroller {

    @Get('transfrom')
    getTransfrom(@QueryParams() data: QueryParamsResult) {
        return { userId: 12 }
    }

    @Post('transfrom')
    postTransfrom(@Body() data: any) {
        return { userId: 12 }
    }
}