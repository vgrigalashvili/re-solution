import { Test, TestingModule } from '@nestjs/testing';
import { UrlMonController } from './url-mon.controller';

describe('UrlMonController', () => {
  let controller: UrlMonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlMonController],
    }).compile();

    controller = module.get<UrlMonController>(UrlMonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
