import { Test, TestingModule } from '@nestjs/testing';
import { ViacepController } from './viacep.controller';

describe('ViacepController', () => {
  let controller: ViacepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViacepController],
    }).compile();

    controller = module.get<ViacepController>(ViacepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
