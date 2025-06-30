import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = new this.eventModel(createEventDto);
    return await event.save();
  }

  async findAll() {
    return await this.eventModel
      .find()
      .populate('asset')
      .populate('driver')
      .populate('company')
      .exec();
  }

  async findByCompany(companyId: string) {
    return await this.eventModel
      .find({ companyId })
      .populate('asset')
      .populate('driver')
      .populate('company')
      .exec();
  }

  async findOne(id: string) {
    const event = await this.eventModel
      .findOne({ _id: id })
      .populate('asset')
      .populate('driver')
      .populate('company')
      .exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async findByDriver(driverId: string) {
    return await this.eventModel
      .find({ driver: driverId, isActive: true })
      .populate('asset')
      .populate('driver')
      .populate('company')
      .exec();
  }

  async findByAsset(vehicleId: string) {
    return await this.eventModel
      .find({ asset: vehicleId, isActive: true })
      .populate('asset')
      .populate('driver')
      .populate('company')
      .exec();
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.eventModel
      .findOneAndUpdate({ _id: id }, { $set: updateEventDto }, { new: true })
      .populate('asset')
      .populate('driver')
      .populate('company')
      .exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.eventModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec();

    if (!result) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return { message: `Event with ID ${id} successfully deleted` };
  }
}
