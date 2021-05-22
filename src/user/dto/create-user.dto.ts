import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(60)
  @IsAlphanumeric()
  @IsNotEmpty()
  readonly username: string;

  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
