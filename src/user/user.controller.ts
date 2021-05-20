import { Controller, Post, Req } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('users')
export class UserController {
  @Post()
  register(@Req() request: Request, response: Response) {
    console.log(request.body);
    return 'hello';
  }
}
