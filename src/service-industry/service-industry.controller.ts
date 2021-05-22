import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ServiceIndustryService } from './service-industry.service';
import { CreateServiceIndustryDto } from './dto/create-service-industry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaginationServiceIndustryDto } from './dto/pagination-service-industry.dto';
import { UpdateServiceIndustryDto } from './dto/update-service-industry.dto';

@Controller('service-industry')
@UseGuards(JwtAuthGuard)
export class ServiceIndustryController {
  constructor(private serviceIndustryService: ServiceIndustryService) {}

  @Post()
  async create(
    @Body(new ValidationPipe())
    createServiceIndustryDto: CreateServiceIndustryDto,
    @Res() response: Response,
  ) {
    const serviceIndustryExist =
      await this.serviceIndustryService.findOneByCpfOrCnpj(
        createServiceIndustryDto.cpfCnpj,
      );
    if (serviceIndustryExist !== undefined) {
      return response.status(HttpStatus.BAD_REQUEST).send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `ServiceIndustry ${createServiceIndustryDto.cpfCnpj} already exist`,
      });
    }
    const { createdAt, updatedAt, deletedAt, ...serviceIndustry } =
      await this.serviceIndustryService.createServiceIndustry(
        createServiceIndustryDto,
      );

    return response.send({
      statusCode: HttpStatus.CREATED,
      message: 'ServiceIndustry created with success',
      data: serviceIndustry,
    });
  }

  @Get()
  async list(
    @Query(new ValidationPipe())
    paginationServiceIndustryDto: PaginationServiceIndustryDto,
    @Res() response: Response,
  ) {
    const serviceIndustryTotal = await this.serviceIndustryService.totalCount();
    if (serviceIndustryTotal === 0) {
      return response.send({
        statusCode: HttpStatus.OK,
        data: null,
      });
    }

    paginationServiceIndustryDto.page = paginationServiceIndustryDto.page || 1;
    paginationServiceIndustryDto.limit =
      paginationServiceIndustryDto.limit || 10;
    const servicesIndustry = await this.serviceIndustryService.findAll(
      paginationServiceIndustryDto,
    );

    return response.send({
      statusCode: HttpStatus.OK,
      page: paginationServiceIndustryDto.page,
      limit: paginationServiceIndustryDto.limit,
      totalCount: serviceIndustryTotal,
      data: servicesIndustry,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) serviceIndustryId: number,
    @Res() response: Response,
  ) {
    const serviceIndustry = await this.serviceIndustryService.findOneById(
      serviceIndustryId,
    );
    if (serviceIndustry === undefined) {
      return response.status(HttpStatus.NOT_FOUND).send({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Service industry with id ${serviceIndustryId} doesn't exist`,
      });
    }

    return response.send({
      statusCode: HttpStatus.OK,
      data: serviceIndustry,
    });
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) serviceIndustryId: number,
    @Res() response: Response,
  ) {
    const serviceIndustry = await this.serviceIndustryService.findOneById(
      serviceIndustryId,
    );
    if (serviceIndustry === undefined) {
      return response.status(HttpStatus.NOT_FOUND).send({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Service industry with id ${serviceIndustryId} doesn't exist`,
      });
    }

    await this.serviceIndustryService.deleteOne(serviceIndustry);

    return response.send({
      statusCode: HttpStatus.OK,
      message: `Service industry of id ${serviceIndustryId} deleted with success`,
    });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) serviceIndustryId: number,
    @Body() updateServiceIndustryDto: UpdateServiceIndustryDto,
    @Res() response: Response,
  ) {
    const serviceIndustry = await this.serviceIndustryService.findOneById(
      serviceIndustryId,
    );
    if (serviceIndustry === undefined) {
      return response.status(HttpStatus.NOT_FOUND).send({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Service industry with id ${serviceIndustryId} doesn't exist`,
      });
    }

    const updatedServiceIndustry =
      await this.serviceIndustryService.updateServiceIndustry(
        serviceIndustry,
        updateServiceIndustryDto,
      );

    return response.send({
      statusCode: HttpStatus.OK,
      message: `Service industry of id ${serviceIndustryId} updated with success`,
      data: updatedServiceIndustry,
    });
  }
}
