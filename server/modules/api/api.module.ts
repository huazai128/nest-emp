import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ApiConstroller } from "./api.controller";

@Module({
    imports: [HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
    })],
    controllers: [ApiConstroller]
})
export class ApiModule { }