import { QueryParams, QueryParamsResult } from '@app/decorators/params.decorator';
import { ApiGuard } from '@app/guards/api.guard';
import { HttpRequest } from '@app/interfaces/request.interface';
import { TransformPipe } from '@app/pipes/transform.pipe';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiConstroller {

    constructor(private readonly apiService: ApiService) { }

    @UseGuards(ApiGuard)
    @Get('transform')
    getTransform(@QueryParams(new TransformPipe(), 'query') data: HttpRequest) {
        console.log(data, 'data========')
        return this.apiService.get(data)
    }

    @UseGuards(ApiGuard)
    @Post('transform')
    postTransform(@Body(new TransformPipe()) data: HttpRequest) {
        return this.apiService.post(data)
    }
}