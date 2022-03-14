import { AxiosService } from "@app/processors/axios/axios.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RouterSercive {
    constructor(private readonly axiosSerice: AxiosService) { }
}