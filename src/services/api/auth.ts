import http, { HttpParams } from '@src/services/http'

function login<T>(data: HttpParams): Promise<any> {
    return http.post<T>(data)
}

export default {
    login,
}
