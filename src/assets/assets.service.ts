// src/companies/services/assets.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Asset, AssetDocument } from '../assets/schemas/asset.schema';
import { CreateAssetDto } from '../assets/dto/create-asset.dto';
import { customAlphabet } from 'nanoid';
import { Company, CompanyDocument } from '../companies/schemas/company.schema';

@Injectable()
export class AssetsService {
  constructor(
    @InjectModel(Asset.name) private readonly assetModel: Model<AssetDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  private generateAssetID(): string {
    const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const customNanoid = customAlphabet(alphanumeric, 10);
    return `ASSET-${customNanoid()}`;
  }

  private generateAssetNumber(): string {
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of the timestamp
    const randomDigits = Math.floor(Math.random() * 900 + 100); // Random 3-digit number
    return `AN-${timestamp}${randomDigits}`;
  }

  async create(createAssetDto: CreateAssetDto): Promise<Asset> {
    const { companyId, ...rest } = createAssetDto;

    // Check if company exists
    const companyExists = await this.companyModel.findById(companyId);
    if (!companyExists) {
      throw new NotFoundException('Company not found');
    }

    const assetId = this.generateAssetID();

    // Add validation to prevent null values
    if (!assetId) {
      throw new BadRequestException('Failed to generate valid asset ID');
    }

    const assetNumber = this.generateAssetNumber();
    if (!assetNumber) {
      throw new BadRequestException('Failed to generate valid asset number');
    }

    const newAsset = new this.assetModel({
      ...rest,
      assetId,
      assetNumber,
      companyId: new Types.ObjectId(companyId),
    });

    const savedAsset = await newAsset.save();

    // Return asset with populated company field
    const populatedAsset = await this.assetModel
      .findById(savedAsset._id)
      .populate('company');
    if (!populatedAsset) {
      throw new NotFoundException('Asset not found after creation');
    }
    return populatedAsset;
  }

  async findAll(): Promise<Asset[]> {
    return this.assetModel.find({ isActive: true }).lean();
  }

  async findByRegion(region?: string): Promise<Asset[]> {
    if (region) {
      return this.assetModel.find({ regions: region }).exec();
    }
    return this.findAll();
  }

  async findByCompany(companyId: string): Promise<Asset[]> {
    if (!Types.ObjectId.isValid(companyId)) {
      throw new BadRequestException('Invalid company ID format');
    }

    return this.assetModel
      .find({
        companyId: new Types.ObjectId(companyId),
        isActive: true,
      })
      .populate('company')
      .exec();
  }

  async findOne(id: string): Promise<Asset> {
    const asset = await this.assetModel.findById(id).exec();
    if (!asset) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }
    // Populate the company field
    const populatedAsset = await this.assetModel
      .findById(id)
      .populate('company');
    if (!populatedAsset) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }
    return populatedAsset;
  }

  async update(
    id: string,
    updateAssetDto: Partial<CreateAssetDto>,
  ): Promise<Asset> {
    const updatedAsset = await this.assetModel
      .findByIdAndUpdate(
        id,
        {
          ...updateAssetDto,
          companyId: updateAssetDto.companyId
            ? new Types.ObjectId(updateAssetDto.companyId)
            : undefined,
        },
        { new: true, runValidators: true },
      )
      .populate('company')
      .exec();

    if (!updatedAsset) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }

    return updatedAsset;
  }

  async remove(id: string): Promise<{ message: string }> {
    // const result = await this.assetModel.findByIdAndDelete(id).exec();

    const result = await this.assetModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec();

    if (!result) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }

    return { message: `Asset with ID ${id} successfully deleted` };
  }
}
