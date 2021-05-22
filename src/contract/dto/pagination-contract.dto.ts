import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationContractDto {
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  limit?: number;
}
