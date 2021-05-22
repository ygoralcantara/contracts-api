import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class PaginationServiceIndustryDto {
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  limit: number;
}
