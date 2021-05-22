import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly serviceProvider: string;

  @IsNotEmpty()
  @IsDateString()
  readonly contractStart: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly contractEnd: Date;

  @IsNotEmpty()
  @IsNumberString()
  readonly serviceIndustryId: number;
}
