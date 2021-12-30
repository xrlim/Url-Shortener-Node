import { Test, TestingModule } from '@nestjs/testing';
import { UrladminController } from './urladmin.controller';

describe('UrladminController', () => {
  let controller: UrladminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrladminController],
    }).compile();

    controller = module.get<UrladminController>(UrladminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
