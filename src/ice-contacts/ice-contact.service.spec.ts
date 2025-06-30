import { Test, TestingModule } from '@nestjs/testing';
import { ICEContactsService } from './ice-contact.service';
import { getModelToken } from '@nestjs/mongoose';

describe('ICEContactsService', () => {
  let service: ICEContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ICEContactsService,
        {
          provide: getModelToken('ICEContact'),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            save: jest.fn(),
            lean: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ICEContactsService>(ICEContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
