import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { configService } from '../config/config.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, JwtModule.register(configService.getJwtConfig())],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
