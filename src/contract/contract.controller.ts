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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateContractDto } from './dto/create-contract.dto';
import { response, Response } from 'express';
import { ContractService } from './contract.service';
import { ServiceIndustryService } from '../service-industry/service-industry.service';
import { UpdateContractDto } from './dto/update-contract.dto';
import { PaginationContractDto } from './dto/pagination-contract.dto';

@Controller('contract')
@UseGuards(JwtAuthGuard)
export class ContractController {
  constructor(
    private contractService: ContractService,
    private serviceIndustryService: ServiceIndustryService,
  ) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createContractDto: CreateContractDto,
    @Res() response: Response,
  ) {
    const { serviceIndustryId } = createContractDto;
    const serviceIndustry = await this.serviceIndustryService.findOneById(
      serviceIndustryId,
    );
    if (serviceIndustry === undefined) {
      return response.status(HttpStatus.NOT_FOUND).send({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Service industry of id ${serviceIndustryId} doesn't exist`,
      });
    }

    const contract = await this.contractService.createContract(
      serviceIndustry,
      createContractDto,
    );
    return response.send({
      statusCode: HttpStatus.OK,
      message: `Contract created with success`,
      data: contract,
    });
  }

  @Put(':id')
  async update(
    @Param('id') contractId: number,
    @Body(new ValidationPipe()) updateContractDto: UpdateContractDto,
    @Res() response: Response,
  ) {
    const contract = await this.contractService.findOneById(contractId);
    if (contract === undefined) {
      return response.status(HttpStatus.NOT_FOUND).send({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Contract of id ${contractId} doesn't exists`,
      });
    }

    const updatedContract = await this.contractService.updateContract(
      contractId,
      updateContractDto,
    );

    return response.send({
      statusCode: HttpStatus.OK,
      message: `Contract updated with success`,
      data: updatedContract,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) contractId: number,
    @Res() response: Response,
  ) {
    const contract = await this.contractService.findOneById(contractId);
    if (contract === undefined) {
      return response.status(HttpStatus.NOT_FOUND).send({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Contract with id ${contractId} doesn't exist`,
      });
    }

    return response.send({
      statusCode: HttpStatus.OK,
      data: contract,
    });
  }

  @Get()
  async list(
    @Query(new ValidationPipe()) paginationContractDto: PaginationContractDto,
    @Res() response: Response,
  ) {
    const contractsTotal = await this.contractService.totalCount();
    if (contractsTotal === 0) {
      return response.send({
        statusCode: HttpStatus.OK,
        data: null,
      });
    }

    paginationContractDto.page = paginationContractDto.page || 1;
    paginationContractDto.limit = paginationContractDto.limit || 10;
    const contracts = await this.contractService.findAll(paginationContractDto);

    return response.send({
      statusCode: HttpStatus.OK,
      page: paginationContractDto.page,
      limit: paginationContractDto.limit,
      totalCount: contractsTotal,
      data: contracts,
    });
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseIntPipe()) contractId: number,
    @Res() response: Response,
  ) {
    const contract = await this.contractService.findOneById(contractId);
    if (contract === undefined) {
      return response.status(HttpStatus.NOT_FOUND).send({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Contract with id ${contractId} doesn't exist`,
      });
    }

    await this.contractService.deleteContract(contract);

    return response.send({
      statusCode: HttpStatus.OK,
      message: `Contract of id ${contractId} deleted with success`,
    });
  }
}
