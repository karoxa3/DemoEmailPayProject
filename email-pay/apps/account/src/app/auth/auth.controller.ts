import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() dto: RegisterDto): Promise<{ email: string }> {
        return await this.authService.register(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        const { id } = await this.authService.validateUser(dto);

        return await this.authService.login(id);
    }
}
