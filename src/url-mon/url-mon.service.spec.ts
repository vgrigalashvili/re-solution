import { Test, TestingModule } from '@nestjs/testing';
import { UrlMonService } from './url-mon.service';

describe('UrlMonService', () => {
  let service: UrlMonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlMonService],
    }).compile();

    service = module.get<UrlMonService>(UrlMonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
