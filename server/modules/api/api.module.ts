import { Module } from "@nestjs/common";
import { ApiConstroller } from "./api.controller";

@Module({
    imports: [],
    controllers: [ApiConstroller]
})
export class ApiModule { }