import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event, EventSchema } from './schemas/event.schema';
import { Asset, AssetSchema } from '../assets/schemas/asset.schema';
import { Driver, DriverSchema } from '../drivers/schemas/driver.schema';
import { Company, CompanySchema } from '../companies/schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Asset.name, schema: AssetSchema },
      { name: Driver.name, schema: DriverSchema },
      { name: Company.name, schema: CompanySchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
