import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './schemas/asset.schema';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [
    // Add any necessary imports here, such as MongooseModule for MongoDB
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    CompaniesModule,
  ],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
