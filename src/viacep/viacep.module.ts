import { HttpModule, Module } from '@nestjs/common';
import { ViacepController } from './viacep.controller';
import { ViacepService } from './viacep.service';
import { configService } from '../config/config.service';

@Module({
  imports: [HttpModule.register(configService.getHttpModuleConfig())],
  controllers: [ViacepController],
  providers: [ViacepService],
})
export class ViacepModule {}
