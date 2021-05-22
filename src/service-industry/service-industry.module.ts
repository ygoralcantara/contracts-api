import { Module } from '@nestjs/common';
import { ServiceIndustryService } from './service-industry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceIndustryEntity } from './service-industry.entity';
import { AddressEntity } from './address.entity';
import { ServiceIndustryController } from './service-industry.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceIndustryEntity, AddressEntity])],
  exports: [TypeOrmModule],
  controllers: [ServiceIndustryController],
  providers: [ServiceIndustryService],
})
export class ServiceIndustryModule {}
