import { Test, TestingModule } from '@nestjs/testing';
import { ServiceIndustryService } from './service-industry.service';

describe('ServiceIndustryService', () => {
  let service: ServiceIndustryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceIndustryService],
    }).compile();

    service = module.get<ServiceIndustryService>(ServiceIndustryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
