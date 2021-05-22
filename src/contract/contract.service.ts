import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractEntity } from './contract.entity';
import { ServiceIndustryEntity } from '../service-industry/service-industry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ServiceIndustryService } from '../service-industry/service-industry.service';
import { PaginationContractDto } from './dto/pagination-contract.dto';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(ContractEntity)
    private contractRespository: Repository<ContractEntity>,
    private serviceIndustryService: ServiceIndustryService,
  ) {}

  async createContract(
    serviceIndustry: ServiceIndustryEntity,
    createContractDto: CreateContractDto,
  ): Promise<ContractEntity> {
    const contract = await this.contractRespository.create(createContractDto);
    contract.serviceIndustry = serviceIndustry;

    return await this.contractRespository.save(contract);
  }

  async findOneById(contractId: number): Promise<ContractEntity> {
    return this.contractRespository.findOne({
      relations: ['serviceIndustry'],
      where: { id: contractId },
    });
  }

  async updateContract(
    contractId: number,
    updateContractDto: UpdateContractDto,
  ): Promise<ContractEntity> {
    const contract = await this.findOneById(contractId);
    const serviceIndustry = await this.serviceIndustryService.findOneById(
      updateContractDto.serviceIndustryId,
    );
    const updatedContract = await this.contractRespository.create(
      updateContractDto,
    );
    updatedContract.serviceIndustry =
      serviceIndustry || contract.serviceIndustry;

    await this.contractRespository.update({ id: contractId }, updatedContract);

    return await this.findOneById(contractId);
  }

  async findAll(
    paginationContractDto: PaginationContractDto,
  ): Promise<ContractEntity[]> {
    const skippedItems =
      (paginationContractDto.page - 1) * paginationContractDto.limit;

    return await this.contractRespository.find({
      relations: ['serviceIndustry'],
      order: {
        name: 'ASC',
      },
      skip: skippedItems,
      take: paginationContractDto.limit,
    });
  }

  async totalCount(): Promise<number> {
    return await this.contractRespository.count();
  }

  async deleteContract(contract: ContractEntity) {
    await this.contractRespository.softRemove(contract);
  }
}
