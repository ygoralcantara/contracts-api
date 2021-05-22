import { Module } from '@nestjs/common';
import { ServiceIndustryService } from './service-industry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceIndustryEntity } from './service-industry.entity';
import { AddressEntity } from './address.entity';
import { ServiceIndustryController } from './service-industry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceIndustryEntity, AddressEntity])],
  exports: [TypeOrmModule, ServiceIndustryService],
  controllers: [ServiceIndustryController],
  providers: [ServiceIndustryService],
})
export class ServiceIndustryModule {}
