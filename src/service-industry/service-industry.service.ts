import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './address.entity';
import { ServiceIndustryEntity } from './service-industry.entity';
import { CreateServiceIndustryDto } from './dto/create-service-industry.dto';
import { PaginationServiceIndustryDto } from './dto/pagination-service-industry.dto';
import { UpdateServiceIndustryDto } from './dto/update-service-industry.dto';
import { zip } from 'rxjs';

@Injectable()
export class ServiceIndustryService {
  constructor(
    @InjectRepository(ServiceIndustryEntity)
    private serviceIndustryRepository: Repository<ServiceIndustryEntity>,
    @InjectRepository(AddressEntity)
    private addressRespository: Repository<AddressEntity>,
  ) {}

  async createServiceIndustry(
    createServiceIndustryDto: CreateServiceIndustryDto,
  ): Promise<ServiceIndustryEntity> {
    const address = await this.addressRespository.save(
      createServiceIndustryDto,
    );
    const serviceIndustry = await this.serviceIndustryRepository.create(
      createServiceIndustryDto,
    );
    serviceIndustry.address = address;
    await this.serviceIndustryRepository.save(serviceIndustry);

    return serviceIndustry;
  }

  async updateServiceIndustry(
    serviceIndustry: ServiceIndustryEntity,
    updateServiceIndustryDto: UpdateServiceIndustryDto,
  ): Promise<ServiceIndustryEntity> {
    const updatedServiceIndustry = this.serviceIndustryRepository.create(
      updateServiceIndustryDto,
    );
    await this.serviceIndustryRepository.update(
      { id: serviceIndustry.id },
      updatedServiceIndustry,
    );
    const updatedAddress = this.addressRespository.create(
      updateServiceIndustryDto,
    );
    await this.addressRespository.update(
      { id: serviceIndustry.address.id },
      updatedAddress,
    );

    return await this.findOneById(serviceIndustry.id);
  }

  async findOneByCpfOrCnpj(cpfCnpj: string): Promise<ServiceIndustryEntity> {
    return this.serviceIndustryRepository.findOne({
      where: { cpfCnpj: cpfCnpj },
      relations: ['address'],
    });
  }

  async totalCount(): Promise<number> {
    return this.serviceIndustryRepository.count();
  }

  async findAll(
    paginationServiceIndustryDto: PaginationServiceIndustryDto,
  ): Promise<ServiceIndustryEntity[]> {
    const skippedItems =
      (paginationServiceIndustryDto.page - 1) *
      paginationServiceIndustryDto.limit;

    return await this.serviceIndustryRepository.find({
      relations: ['address'],
      order: {
        name: 'ASC',
      },
      skip: skippedItems,
      take: paginationServiceIndustryDto.limit,
    });
    // return await this.serviceIndustryRepository
    //   .createQueryBuilder('service_industry')
    //   .leftJoinAndSelect('service_industry.address', 'address')
    //   .offset(skippedItems)
    //   .limit(paginationServiceIndustryDto.limit)
    //   .getMany();
  }

  async findOneById(serviceIndustryId: number): Promise<ServiceIndustryEntity> {
    return this.serviceIndustryRepository.findOne({
      relations: ['address'],
      where: { id: serviceIndustryId },
    });
  }

  async deleteOne(serviceIndustry: ServiceIndustryEntity) {
    return this.serviceIndustryRepository.softRemove(serviceIndustry);
  }
}
