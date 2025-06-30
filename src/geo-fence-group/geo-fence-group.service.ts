import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GeoFenceGroup, GeoFenceGroupDocument } from './schemas/geo-fence-group.schema';
import { CreateGeoFenceGroupDto } from './dto/create-geo-fence-group.dto';
import { UpdateGeoFenceGroupDto } from './dto/update-geo-fence-group.dto';

@Injectable()
export class GeoFenceGroupService {
  constructor(
    @InjectModel(GeoFenceGroup.name)
    private readonly groupModel: Model<GeoFenceGroupDocument>,
  ) { }

  async create(dto: CreateGeoFenceGroupDto): Promise<GeoFenceGroup> {
    const group = new this.groupModel(dto);
    return group.save();
  }

  async findAll(): Promise<GeoFenceGroup[]> {
    return this.groupModel.find().populate('geoFencesDetails').lean();
  }

  async findById(id: string): Promise<GeoFenceGroup> {
    const group = await this.groupModel.findById(id).populate('geoFencesDetails');
    if (!group) throw new NotFoundException('GeoFenceGroup not found');
    return group;
  }

  async update(id: string, dto: UpdateGeoFenceGroupDto): Promise<GeoFenceGroup> {
    const updated = await this.groupModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('GeoFenceGroup not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.groupModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('GeoFenceGroup not found');
  }
}
