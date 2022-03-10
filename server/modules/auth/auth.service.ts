import { Injectable } from "@nestjs/common";
import { HttpRequest } from "@app/interfaces/request.interface";
import { AxiosService } from "@app/modules/axios/axios.service";
import { User } from "./auth.interface";
import { config } from "@app/config";
import { HttpUnauthorizedError } from "@app/errors/unauthorized.error";

@Injectable()
export class AuthService {

    constructor(private readonly axiosService: AxiosService) { }

    public async validateUser(user: User) {
        const res = await this.findById(user._id); // 查询用户是否存在
        if (!res) {
            throw new HttpUnauthorizedError()
        }
        return res
    }

    public async login({ transformUrl, transferData }: HttpRequest): Promise<any> {
        return await this.axiosService.post<User>(transformUrl, transferData)
    }

    public async findById(id): Promise<any> {
        const url = config.apiPrefix.baseApi + '/user/info'
        const res = await this.axiosService.get<User>(url, { params: { id: id } })
        return res
    }
}