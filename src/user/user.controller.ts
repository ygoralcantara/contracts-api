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
    const userExist = await this.userService.findOneByUsernameOrEmail(
      createUserDto.username,
      createUserDto.email,
    );
    if (userExist !== undefined) {
      return response.status(HttpStatus.BAD_REQUEST).send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `User ${createUserDto.username} already exist`,
      });
    }
    const { password, createdAt, updatedAt, deletedAt, ...user } =
      await this.userService.createUser(createUserDto);

    return response.send({
      statusCode: HttpStatus.CREATED,
      message: 'User created with success',
      data: user,
    });
  }
}
