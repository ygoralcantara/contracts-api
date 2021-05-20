import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async register(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    const checkIfUserExists = await this.userService.checkIfUserExists(
      createUserDto.username,
      createUserDto.email,
    );
    if (checkIfUserExists) {
      return response.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `User ${createUserDto.username} already exist`,
      });
    }
    const { password, created_at, updated_at, deleted_at, ...user } =
      await this.userService.createUser(createUserDto);

    return response.send({
      status: HttpStatus.CREATED,
      message: 'User created with success',
      data: user,
    });
  }
}
