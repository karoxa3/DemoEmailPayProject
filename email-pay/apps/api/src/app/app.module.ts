import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { getJWTConfig } from './configs/jwt.config';
import { getRMQConfig } from './configs/rmq.config';

import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: 'envs/.api.env' }),
        RMQModule.forRootAsync(getRMQConfig()),
        JwtModule.registerAsync(getJWTConfig()),
        PassportModule,
    ],
    controllers: [AuthController, UserController],
    providers: [],
})
export class AppModule {}
