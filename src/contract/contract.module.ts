import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './contract.entity';
import { ContractController } from './contract.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity])],
  exports: [TypeOrmModule],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
