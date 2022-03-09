import { QueryParams, QueryParamsResult } from '@app/decorators/params.decorator';
import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('api')
export class ApiConstroller {
    constructor(private readonly httpService: HttpService) {

    }
    @Get('transfrom')
    getTransfrom(@QueryParams('query') data: QueryParamsResult) {
        return { userId: 12 }
    }

    @Post('transfrom')
    postTransfrom(@Body() data: Record<string, any>) {
        console.log(data, '======data')
        return { userId: 12 }
    }
}