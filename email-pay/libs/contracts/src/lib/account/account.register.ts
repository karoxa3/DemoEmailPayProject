import { IsEmail, IsString } from 'class-validator';

export namespace AccountRegister {
    export const topic = 'account.register.command';

    export class Request {
        @IsEmail()
        email: string;
        @IsString()
        password: string;
        @IsString()
        userName: string;
    }

    export class Response {
        @IsEmail()
        email: string;
    }
}
