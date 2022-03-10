import { Injectable } from "@nestjs/common";
import { PassportSerializer } from '@nestjs/passport';
import { User } from "./auth.interface";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthSerializer extends PassportSerializer {
    constructor(private readonly authService: AuthService) {
        super()
    }
    public serializeUser(user = {} as User, done: (err: Error, user: { id: string; accunt: string }) => void) {
        console.log(user)
        done(null as any, { id: user._id, accunt: user.account })
    }

    public async deserializeUser(payload: { id: number; role: string }, done: (err: Error, user: Omit<User, 'password'>) => void) {
        console.log('112121====')
        const user = await this.authService.findById(payload.id);
        done(null as any, user);
    }
}