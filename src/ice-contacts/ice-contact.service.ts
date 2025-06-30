import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ICEContact, ICEContactDocument } from './schemas/ice-contact.schema';
import { CreateICEContactDto } from './dto/create-ice-contact.dto';
import { UpdateICEContactDto } from './dto/update-ice-contact.dto';
import { Company, CompanyDocument } from 'src/companies/schemas/company.schema';

@Injectable()
export class ICEContactsService {
  constructor(
    @InjectModel(ICEContact.name)
    private readonly iceContactModel: Model<ICEContactDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async create(createICEContactDto: CreateICEContactDto) {
    // Validate that companyId is a valid ObjectId
    if (!Types.ObjectId.isValid(createICEContactDto.companyId)) {
      throw new BadRequestException('Invalid company ID format');
    }

    // Check if company exists
    const companyExists = await this.companyModel.findById(
      createICEContactDto.companyId,
    );
    if (!companyExists) {
      throw new NotFoundException('Company not found');
    }

    const createdContact = new this.iceContactModel({
      ...createICEContactDto,
      companyId: new Types.ObjectId(createICEContactDto.companyId),
    });
    return createdContact.save();
  }

  async findAll(): Promise<ICEContact[]> {
    return this.iceContactModel.find({ isActive: true }).lean();
  }

  async findByRegion(region?: string): Promise<ICEContact[]> {
    if (region) {
      return this.iceContactModel.find({ regions: region }).exec();
    }
    return this.findAll();
  }

  async findByCompany(companyId: string): Promise<ICEContact[]> {
    if (!Types.ObjectId.isValid(companyId)) {
      throw new BadRequestException('Invalid company ID format');
    }

    return this.iceContactModel
      .find({
        companyId: new Types.ObjectId(companyId),
        isActive: true,
      })
      .populate('company')
      .exec();
  }

  async findOne(id: string): Promise<ICEContact> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ICE contact ID format');
    }

    const contact = await this.iceContactModel
      .findById(id)
      .populate('company')
      .lean();

    if (!contact) {
      throw new NotFoundException(`ICE Contact not found - Provide a valid id`);
    }

    return contact;
  }

  async update(
    id: string,
    updateICEContactDto: UpdateICEContactDto,
  ): Promise<ICEContact> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ICE contact ID format');
    }

    // If companyId is provided, validate it
    if (
      updateICEContactDto.companyId &&
      !Types.ObjectId.isValid(updateICEContactDto.companyId)
    ) {
      throw new BadRequestException('Invalid company ID format');
    }

    const updatedContact = await this.iceContactModel
      .findByIdAndUpdate(id, updateICEContactDto, { new: true })
      .exec();

    if (!updatedContact) {
      throw new NotFoundException(`ICE Contact not found - Provide a valid id`);
    }

    return updatedContact;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ICE contact ID format');
    }

    // const deleteResult = await this.iceContactModel.findByIdAndDelete(id);

    const deleteResult = await this.iceContactModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec();

    if (!deleteResult) {
      throw new NotFoundException(`ICE Contact not found - Provide a valid id`);
    }

    return;
  }
}
