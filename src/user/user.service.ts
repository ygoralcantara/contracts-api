import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { isNotEmpty } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(
      this.userRepository.create(createUserDto),
    );
  }

  async checkIfUserExists(username: string, email: string): Promise<boolean> {
    const user = await this.userRepository
      .createQueryBuilder()
      .where('username = :username', {
        username: username,
      })
      .orWhere('email = :email', {
        email: email,
      })
      .getOne();

    return user !== undefined;
  }
}
