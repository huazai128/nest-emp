import { HttpRequest } from "@app/interfaces/request.interface";
import logger from "@app/utils/logger";
import { Injectable } from "@nestjs/common";
import axios, { AxiosResponse } from "axios";
import { catchError, map, Observable } from "rxjs";

@Injectable()
export class AuthService {
    constructor() { }

    public async login({ transformUrl, transferData }: HttpRequest) {
        // logger.info(transformUrl)
        // const res = await axios.get(transformUrl)
        // console.log(res.data, 'res')
        // this.httpService.get(transformUrl) // 没有发出请求，难道没有用axios
        return 12
    }
}