import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { AuthSerializer } from "./serialization.provider";

@Module({
    imports: [
        PassportModule.register({
            session: true
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, AuthSerializer],

})
export class AuthModule { }