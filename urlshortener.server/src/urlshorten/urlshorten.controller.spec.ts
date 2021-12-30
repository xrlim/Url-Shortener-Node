import { Test, TestingModule } from '@nestjs/testing';
import { UrlshortenController } from './urlshorten.controller';

describe('UrlshortenController', () => {
  let controller: UrlshortenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlshortenController],
    }).compile();

    controller = module.get<UrlshortenController>(UrlshortenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
