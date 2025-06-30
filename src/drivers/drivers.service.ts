import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Driver, DriverDocument } from './schemas/driver.schema';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Company, CompanyDocument } from '../companies/schemas/company.schema';
import { customAlphabet } from 'nanoid';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AwsCredentialIdentity } from '@aws-sdk/types';

@Injectable()
export class DriversService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(
    @InjectModel(Driver.name)
    private readonly driverModel: Model<DriverDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {
    // const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    // const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    // const region = process.env.AWS_REGION;
    // const bucketName = process.env.DRIVERS_BUCKET_NAME;

    // if (!accessKeyId || !secretAccessKey || !region || !bucketName) {
    //   throw new BadRequestException('Missing required AWS configuration');
    // }

    // const credentials: AwsCredentialIdentity = {
    //   accessKeyId,
    //   secretAccessKey,
    // };

    // this.s3Client = new S3Client({
    //   region,
    //   credentials,
    // });
    // this.bucketName = bucketName;
  }

  private generateDriverNumber(): string {
    const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const customNanoid = customAlphabet(alphanumeric, 10);
    return `DRIVER-${customNanoid()}`;
  }

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    // Check if the company exists
    const companyExists = await this.companyModel
      .findById(createDriverDto.companyId)
      .exec();
    if (!companyExists) {
      throw new NotFoundException('Company not found');
    }
    // // Check if the driver already exists
    // const existingDriver = await this.driverModel
    //   .findOne({ email: createDriverDto.email.toLowerCase() })
    //   .exec();
    // if (existingDriver) {
    //   throw new NotFoundException('Driver with this email already exists');
    // }

    // Generate a unique driver number
    const driverNumber = this.generateDriverNumber();

    if (!driverNumber) {
      throw new BadRequestException('Failed to generate valid driver number');
    }

    // Create the new driver with the generated driverNumber
    const newDriver = new this.driverModel({
      ...createDriverDto,
      driverNumber,
      companyId: new Types.ObjectId(createDriverDto.companyId),
    });

    // Save the new driver to the database
    const savedDriver = await newDriver.save();

    // Populate the company field
    const populatedDriver = await this.driverModel
      .findById(savedDriver._id)
      .populate('company')
      .exec();
    if (!populatedDriver) {
      throw new NotFoundException('Driver not found after creation');
    }
    return populatedDriver;
  }

  async findAll(): Promise<Driver[]> {
    return this.driverModel.find({ isActive: true }).lean();
  }

  async findByRegion(region?: string): Promise<Driver[]> {
    if (region) {
      return this.driverModel.find({ regions: region }).exec();
    }
    return this.findAll();
  }

  async findByCompany(companyId: string): Promise<Driver[]> {
    if (!Types.ObjectId.isValid(companyId)) {
      throw new BadRequestException('Invalid company ID format');
    }

    return this.driverModel
      .find({
        companyId: new Types.ObjectId(companyId),
        isActive: true,
      })
      .populate('company')
      .exec();
  }

  async findOne(id: string): Promise<Driver> {
    const driver = await this.driverModel.findById(id).exec();
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    // Populate the company field
    const populatedDriver = await this.driverModel
      .findById(id)
      .populate('company')
      .exec();
    if (!populatedDriver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return populatedDriver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    const updatedDriver = await this.driverModel
      .findByIdAndUpdate(
        id,
        {
          ...updateDriverDto,
          companyId: updateDriverDto.companyId
            ? new Types.ObjectId(updateDriverDto.companyId)
            : undefined,
        },
        { new: true, runValidators: true },
      )
      .populate('company')
      .exec();
    if (!updatedDriver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return updatedDriver;
  }

  async remove(id: string): Promise<{ message: string }> {
    // const deleted = await this.driverModel.findByIdAndDelete(id);

    const deleted = await this.driverModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec();

    if (!deleted) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return { message: 'Driver deleted successfully' };
  }

  async getUploadUrl(
    id: string,
    type: 'license-front' | 'license-back' | 'id-photo',
  ): Promise<{ uploadUrl: string; key: string; fileUrl: string }> {
    const driver = await this.findOne(id);
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    const fileExtension = 'jpg';
    const key = `${driver.idNumber}/${type}.${fileExtension}`;

    try {
      const input: PutObjectCommandInput = {
        Bucket: this.bucketName,
        Key: key,
        ContentType: `image/${fileExtension}`,
      };

      const command = new PutObjectCommand(input);
      const uploadUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      });

      const region = process.env.AWS_REGION || 'af-south-1';
      const fileUrl = `https://${this.bucketName}.s3.${region}.amazonaws.com/${key}`;

      return {
        uploadUrl,
        key,
        fileUrl,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new BadRequestException(
          `Failed to generate upload URL: ${err.message}`,
        );
      }
      throw new BadRequestException('Failed to generate upload URL');
    }
  }

  async updateLicenseUrls(
    id: string,
    frontUrl: string,
    backUrl: string,
  ): Promise<Driver> {
    const updatedDriver = await this.driverModel
      .findByIdAndUpdate(
        id,
        {
          licenseFrontUrl: frontUrl || undefined,
          licenseBackUrl: backUrl || undefined,
        },
        { new: true, runValidators: true },
      )
      .populate('company')
      .exec();

    if (!updatedDriver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    return updatedDriver;
  }
}
