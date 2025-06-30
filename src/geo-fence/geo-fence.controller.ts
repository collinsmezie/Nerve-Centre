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
import { GeoFenceService } from './geo-fence.service';
import { CreateGeoFenceDto } from './dto/create-geo-fence.dto';
import { UpdateGeoFenceDto } from './dto/update-geo-fence.dto';

@Controller('geofences')
export class GeoFenceController {
  constructor(private readonly geoFenceService: GeoFenceService) { }

  @Post('new')
  create(@Body() createDto: CreateGeoFenceDto) {
    return this.geoFenceService.create(createDto);
  }

  @Get('all')
  findAll() {
    return this.geoFenceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const geoFence = await this.geoFenceService.findById(id);
    if (!geoFence) throw new NotFoundException('Geo-fence not found');
    return geoFence;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateGeoFenceDto) {
    return this.geoFenceService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.geoFenceService.delete(id);
  }

  @Patch(':id/assign-fence')
  assignGeoFence(
    @Param('id') id: string,
    @Body() body: { geoFenceId: string },
  ) {
    return this.geoFenceService.assignFenceToGroup(id, body.geoFenceId);
  }
}
