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

    return response.send({
      statusCode: HttpStatus.OK,
      data: res,
    });
  }
}
