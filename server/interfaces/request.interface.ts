import { ConfigServer } from "./config.interface";

export interface HttpRequest {
    transformUrl: string
    transferData: Record<string, any>
    apiTransferType?: ConfigServer['apiPrefix']
}
