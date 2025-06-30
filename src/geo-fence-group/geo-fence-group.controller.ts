// geofence-groups.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { GeoFenceGroupService } from './geo-fence-group.service';
import { CreateGeoFenceGroupDto } from './dto/create-geo-fence-group.dto';
import { UpdateGeoFenceGroupDto } from './dto/update-geo-fence-group.dto';

@Controller('geofence-groups')
export class GeoFenceGroupController {
  constructor(private readonly groupsService: GeoFenceGroupService) {}

  @Post('new')
  create(@Body() createDto: CreateGeoFenceGroupDto) {
    return this.groupsService.create(createDto);
  }

  @Get('all')
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const group = await this.groupsService.findById(id);
    if (!group) throw new NotFoundException('Geo-fence group not found');
    return group;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateGeoFenceGroupDto) {
    return this.groupsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.delete(id);
  }
}
