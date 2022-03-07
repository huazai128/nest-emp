import { Module } from "@nestjs/common";
import { ApiConstroller } from "./api.controller";

@Module({
    controllers: [ApiConstroller]
})
export class ApiModule { }