import { QueryParams, QueryParamsResult } from '@app/decorators/params.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('api')
export class ApiConstroller {

    @Get('transfrom')
    getTransfrom(@QueryParams('query') data: QueryParamsResult) {
        return { userId: 12 }
    }

    @Post('transfrom')
    postTransfrom(@Body() data: Record<string, any>) {
        return { userId: 12 }
    }
}