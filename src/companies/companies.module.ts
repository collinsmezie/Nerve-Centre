import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { Asset } from 'src/assets/schemas/asset.schema';
import { Driver } from 'src/drivers/schemas/driver.schema';
import { AssetSchema } from 'src/assets/schemas/asset.schema';
import { DriverSchema } from 'src/drivers/schemas/driver.schema';

@Module({
  imports: [
    // Add any necessary imports here, such as MongooseModule for MongoDB
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [MongooseModule, CompaniesService], // Export the service if needed in other modules
})
export class CompaniesModule {}
