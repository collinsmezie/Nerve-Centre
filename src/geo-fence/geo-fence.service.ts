import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GeoFence, GeoFenceDocument } from './schemas/geo-fence.schema';
import { GeoFenceGroup, GeoFenceGroupDocument } from '../geo-fence-group/schemas/geo-fence-group.schema';
import { CreateGeoFenceDto } from './dto/create-geo-fence.dto';
import { UpdateGeoFenceDto } from './dto/update-geo-fence.dto';

@Injectable()
export class GeoFenceService {
  constructor(
    @InjectModel(GeoFence.name)
    private readonly geoFenceModel: Model<GeoFenceDocument>,
    @InjectModel(GeoFenceGroup.name)
    private readonly groupModel: Model<GeoFenceGroupDocument>,
  ) { }

  /**
   * Creates a new geo-fence and optionally assigns it to a group(if a valid group id is provided).
   * @param dto - The data transfer object containing geo-fence details.
   * @returns The created geo-fence.
   */
  async create(dto: CreateGeoFenceDto & { groupId?: string }): Promise<{ message?: string, data: GeoFence }> {
    const { type, hour, groupId } = dto;

    let groupExists = false;

    // Enforce business rules
    if (type === 'regular' && hour) {
      throw new BadRequestException('Regular geo-fences must not include an hour value.');
    }
    if (type === 'special' && !hour) {
      throw new BadRequestException('Special geo-fences must include an hour value.');
    }

    if (groupId) {
      const group = await this.groupModel.findById(groupId);
      if (!group) delete dto.groupId;
      else groupExists = true;
    }

    const fence = await this.geoFenceModel.create(dto);

    if (groupExists) {
      try {
        await this.assignFenceToGroup(groupId!, fence.id);
      } catch (error) {
        throw new BadRequestException(
          `Geo-fence was created but failed to assign to group: ${error.message}`,
        );
      }
    }

    const createdFence = await this.geoFenceModel
      .findById(fence.id)
      .populate('groupId');

    if (!createdFence) {
      throw new NotFoundException('GeoFence not found after creation');
    }

    return groupExists
      ? { message: 'Geo-fence created & successfully assigned to a group', data: createdFence }
      : { message: 'Geo-fence created but not assigned to a group', data: createdFence };
  }

  async findAll(): Promise<GeoFence[]> {
    const fences = await this.geoFenceModel.find().populate('groupId').lean();
    if (!fences) throw new NotFoundException('GeoFences not found');

    return fences;
  }

  async findById(id: string): Promise<GeoFence> {
    const fence = await this.geoFenceModel.findById(id);
    if (!fence) throw new NotFoundException('GeoFence not found');

    return fence;
  }

  async update(id: string, dto: UpdateGeoFenceDto): Promise<GeoFence> {
    const updated = await this.geoFenceModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('GeoFence not found');

    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.geoFenceModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('GeoFence not found');
  }

  async assignFenceToGroup(groupId: string, fenceId: string): Promise<string> {
    if (!Types.ObjectId.isValid(fenceId)) {
      throw new BadRequestException('Invalid geo-fence ID');
    }

    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('GeoFenceGroup not found');

    const fenceObjectId = new Types.ObjectId(fenceId);

    if (!group.geoFences.includes(fenceObjectId)) {
      group.geoFences.push(fenceObjectId);
      await group.save();
    }

    return 'Success'
  }
}
