import { Test, TestingModule } from '@nestjs/testing';
import { UrlredirectController } from './urlredirect.controller';

describe('UrlredirectController', () => {
  let controller: UrlredirectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlredirectController],
    }).compile();

    controller = module.get<UrlredirectController>(UrlredirectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
