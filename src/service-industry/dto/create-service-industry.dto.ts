import {
  IsAlpha,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPostalCode,
  IsString,
} from 'class-validator';

export class CreateServiceIndustryDto {
  @IsNotEmpty()
  @IsNumberString()
  readonly cpfCnpj: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  readonly name: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly type: 'cpf' | 'cnpj';

  @IsNotEmpty()
  @IsPostalCode('BR')
  readonly zipCode: string;

  @IsOptional()
  @IsString()
  readonly street: string;

  @IsOptional()
  @IsNumber()
  readonly number: number;

  @IsOptional()
  @IsString()
  readonly addressLine: string;

  @IsOptional()
  @IsString()
  readonly district: string;

  @IsOptional()
  @IsString()
  readonly city: string;

  @IsOptional()
  @IsString()
  readonly stateCode: string;
}
