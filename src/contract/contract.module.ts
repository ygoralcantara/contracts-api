import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './contract.entity';
import { ContractController } from './contract.controller';
import { ServiceIndustryModule } from '../service-industry/service-industry.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity]), ServiceIndustryModule],
  exports: [TypeOrmModule],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
