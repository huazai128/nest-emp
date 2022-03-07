import { Controller, Get, Body, Param, Post } from '@nestjs/common';

@Controller('api')
export class ApiConstroller {

    @Get('transfrom')
    getTransfrom(@Param() data: any) {
        console.log(data)
        return { userId: 12 }
    }

    @Post('transfrom')
    postTransfrom(@Body() data: any) {
        console.log(data)
        return { userId: 12 }
    }
}