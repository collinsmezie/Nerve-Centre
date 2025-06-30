import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Company } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { customAlphabet } from 'nanoid';
import { Driver } from 'src/drivers/schemas/driver.schema';
import { Asset } from 'src/assets/schemas/asset.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
    @InjectModel(Asset.name)
    private readonly assetModel: Model<Asset>,
    @InjectModel(Driver.name)
    private readonly driverModel: Model<Driver>,
  ) {}

  async getAssetCount(companyId: Types.ObjectId): Promise<number> {
    return this.assetModel.countDocuments({ companyId }).exec();
  }

  async getDriverCount(companyId: Types.ObjectId): Promise<number> {
    return this.driverModel.countDocuments({ companyId }).exec();
  }

  private generateCompanyID(): string {
    const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const customNanoid = customAlphabet(alphanumeric, 10);
    return `CMP-${customNanoid()}`;
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    // Generate company ID
    const companyID = this.generateCompanyID();

    // Get first 3 letters of company name in uppercase
    const prefix = createCompanyDto.companyName.slice(0, 3).toUpperCase();

    // Find companies with the same prefix in their abbreviation
    const existingCompanies = await this.companyModel
      .find({ companyAbbreviation: new RegExp(`^${prefix}-\\d{3}$`) })
      .sort({ companyAbbreviation: -1 })
      .lean();

    let abbreviation: string;

    if (existingCompanies.length > 0) {
      // Extract the highest sequence number and increment it
      const latestAbbreviation = existingCompanies[0].companyAbbreviation;
      const currentSequence = parseInt(latestAbbreviation.split('-')[1]);
      const newSequence = (currentSequence + 1).toString().padStart(3, '0');
      abbreviation = `${prefix}-${newSequence}`;
    } else {
      // No existing companies with this prefix, start with 001
      abbreviation = `${prefix}-001`;
    }

    const company = new this.companyModel({
      ...createCompanyDto,
      companyIdNo: companyID,
      companyAbbreviation: abbreviation,
    });

    return company.save();
  }

  async findAllByRegion(region?: string): Promise<Company[]> {
    const query: Record<string, any> = {};
    if (region) {
      query.region = region;
    }
    return await this.companyModel.find(query).exec();
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.companyModel
      .aggregate([
        {
          $match: { isActive: true },
        },
        {
          $lookup: {
            from: 'assets', // The name of the vehicles collection
            localField: '_id',
            foreignField: 'companyId',
            as: 'assets',
          },
        },
        {
          $lookup: {
            from: 'drivers', // The name of the drivers collection
            localField: '_id',
            foreignField: 'companyId',
            as: 'drivers',
          },
        },
        {
          $addFields: {
            assetCount: { $size: '$assets' },
            driverCount: { $size: '$drivers' },
          },
        },
        {
          $project: {
            assets: 0, // Remove the vehicles array from the result
            drivers: 0, // Remove the drivers array from the result
          },
        },
      ])
      .exec();

    return companies as Company[];
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyModel.findById(id);

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto, { new: true })
      .exec();

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async remove(id: string): Promise<{ message: string }> {
    // const result = await this.companyModel
    //   .deleteOne({ _id: new Types.ObjectId(id) })
    //   .exec();

    const result = await this.companyModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec();

    if (!result) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return { message: `Company with ID ${id} successfully deleted` };
  }
}
