import { AXIOS_INSTANCE_TOKEN } from "@app/constants/axios.constant";
import { Inject, Injectable } from "@nestjs/common";
import Axios, { AxiosInstance } from "axios";

@Injectable()
export class AxiosService {

    constructor(@Inject(AXIOS_INSTANCE_TOKEN) readonly instance: AxiosInstance = Axios) {

    }


}