import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiBearerAuth('JWT-auth')
@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Roles(['admin'])
  @Post('new')
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  @ApiBody({ type: CreateEventDto })
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventsService.create(createEventDto);
  }

  @Roles(['admin', 'bureau'])
  @Get('all')
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'List of all events' })
  async findAll() {
    return await this.eventsService.findAll();
  }

  @Roles(['admin', 'bureau'])
  @Get('company/:companyId')
  @ApiOperation({ summary: 'Get all events for a specific company' })
  @ApiParam({
    name: 'companyId',
    description: 'Company ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'List of events for the specified company.',
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid company ID format.',
  })
  async findByCompany(@Param('companyId') companyId: string) {
    return await this.eventsService.findByCompany(companyId);
  }

  @Roles(['admin', 'bureau'])
  @Get(':id')
  @ApiOperation({ summary: 'Get a single event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Event found' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async findOne(@Param('id') id: string) {
    return await this.eventsService.findOne(id);
  }

  @Roles(['admin, bureau'])
  @Get('driver/:driverId')
  @ApiOperation({ summary: 'Get all events for a specific driver' })
  @ApiParam({
    name: 'driverId',
    description: 'Driver ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'List of events for the specified driver.',
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Diver ID format.',
  })
  async findByDriver(@Param('driverId') driverId: string) {
    return await this.eventsService.findByDriver(driverId);
  }

  @Roles(['admin', 'bureau'])
  @Get('asset/:assetId')
  @ApiOperation({ summary: 'Get all events for a specific asset' })
  @ApiParam({
    name: 'assetId',
    description: 'Asset ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'List of events for the specified asset.',
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid asset ID format.',
  })
  async findByAsset(@Param('assetId') assetId: string) {
    return await this.eventsService.findByAsset(assetId);
  }

  @Roles(['admin'])
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update an event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiBody({ type: UpdateEventDto })
  @ApiResponse({ status: 200, description: 'Event updated successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return await this.eventsService.update(id, updateEventDto);
  }

  @Roles(['admin'])
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Event deleted.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async remove(@Param('id') id: string) {
    return await this.eventsService.remove(id);
  }
}
