import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { ServiceIndustryController } from './service-industry/service-industry.controller';
import { ServiceIndustryModule } from './service-industry/service-industry.module';
import { ContractController } from './contract/contract.controller';
import { ContractModule } from './contract/contract.module';
import { ViacepModule } from './viacep/viacep.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    ServiceIndustryModule,
    ContractModule,
    ViacepModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
