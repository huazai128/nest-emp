import { QueryParams, QueryParamsResult } from '@app/decorators/params.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('api')
export class ApiConstroller {

    @Get('transform')
    getTransform(@QueryParams('query') data: QueryParamsResult) {
        return { userId: 12 }
    }

    @Post('transform')
    postTransform(@Body() data: Record<string, any>) {
        return { userId: 12 }
    }
}