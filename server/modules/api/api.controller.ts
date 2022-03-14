import { QueryParams, QueryParamsResult } from '@app/decorators/params.decorator';
import { TransformPipe } from '@app/pipes/transform.pipe';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('api')
export class ApiConstroller {

    @Get('transform')
    getTransform(@QueryParams('query', new TransformPipe()) data: QueryParamsResult) {
        return { userId: 12 }
    }

    @Post('transform')
    postTransform(@Body() data: Record<string, any>) {
        return { userId: 12 }
    }
}