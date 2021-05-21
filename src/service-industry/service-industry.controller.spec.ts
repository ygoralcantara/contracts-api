import { Test, TestingModule } from '@nestjs/testing';
import { ServiceIndustryController } from './service-industry.controller';

describe('ServiceIndustryController', () => {
  let controller: ServiceIndustryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceIndustryController],
    }).compile();

    controller = module.get<ServiceIndustryController>(ServiceIndustryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
