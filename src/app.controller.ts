import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Response,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() request, @Response() response) {
    const accessToken = await this.authService.login(request.body);

    return response.send({
      status: HttpStatus.OK,
      message: 'Authenticated with success',
      data: {
        access_token: accessToken,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
