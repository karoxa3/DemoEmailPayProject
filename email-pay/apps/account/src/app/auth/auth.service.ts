import { AccountLogin, AccountRegister } from '@email-pay/contracts';
import { UserRoleEnum } from '@email-pay/interfaces';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/repositories/user.repostitory';
// import { LoginDto } from './dto/login.dto';
// import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository
    ) {}

    /**
     * Регистрация нового пользователя
     */
    async register({
        userName,
        email,
        password,
    }: AccountRegister.Request): Promise<{ email: string }> {
        const oldUser = await this.userRepository.findUser(email);
        if (oldUser) {
            throw new HttpException(
                'This user is already registered. Изменение номер 2222222',
                HttpStatus.BAD_REQUEST
            );
        }
        const newUserEntity = await new UserEntity({
            userName,
            email,
            passwordHash: '',
            role: UserRoleEnum.CUSTOMER,
        }).setPassword(password);

        const newUser = await this.userRepository.createUser(newUserEntity);

        return { email: newUser.email };
    }

    /**
     * Проверка пользователя на валидность
     */
    async validateUser({
        email,
        password,
    }: AccountLogin.Request): Promise<{ id: string }> {
        try {
            const user = await this.userRepository.findUser(email);

            if (!user) {
                throw new Error('Неверный логин или пароль.');
            }

            const userEntity = new UserEntity(user);

            const isCorrectPassword = await userEntity.validatePassword(
                password
            );

            if (!isCorrectPassword) {
                throw new Error('Неверный логин или пароль.');
            }

            return { id: user._id };
        } catch (error) {
            console.log(error);
        }
    }

    async login(id: string) {
        return {
            access_token: await this.jwtService.signAsync({ id }),
        };
    }
}
