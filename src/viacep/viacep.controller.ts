import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ViacepService } from './viacep.service';
import { Response } from 'express';

@Controller('viacep')
@UseGuards(JwtAuthGuard)
export class ViacepController {
  constructor(private viacepService: ViacepService) {}

  @Get(':zipcode')
  async getAddressByZipCode(
    @Param('zipcode') zipCode: string,
    @Res() response: Response,
  ) {
    const res = await this.viacepService.findAddressByZipcode(zipCode);
    if (!res) {
      return response.send({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Postal code ${zipCode} don't found`,
      });
    }

    return response.send({
      statusCode: HttpStatus.OK,
      data: res,
    });
  }
}
