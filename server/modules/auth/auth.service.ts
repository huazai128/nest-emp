import { HttpRequest } from "@app/interfaces/request.interface";
import { Injectable } from "@nestjs/common";
import { AxiosService } from "@app/modules/axios/axios.service";

@Injectable()
export class AuthService {

    constructor(private readonly axiosService: AxiosService) { }
    public async login({ transformUrl, transferData }: HttpRequest) {
        return await this.axiosService.post(transformUrl, transferData)
    }
}