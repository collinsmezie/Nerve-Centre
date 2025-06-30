import { Test, TestingModule } from '@nestjs/testing';
import { ICEContactsController } from './ice-contact.controller';
import { ICEContactsService } from './ice-contact.service';

describe('ICEContactsController', () => {
  let controller: ICEContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ICEContactsController],
      providers: [
        {
          provide: ICEContactsService,
          useValue: {
            findAll: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ICEContactsController>(ICEContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
