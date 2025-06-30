import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ICEContactsService } from './ice-contact.service';
import { CreateICEContactDto } from './dto/create-ice-contact.dto';
import { UpdateICEContactDto } from './dto/update-ice-contact.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth')
@ApiTags('ICE Contacts')
@Controller('ice-contacts')
@UseGuards(RolesGuard)
export class ICEContactsController {
  constructor(private readonly iceContactsService: ICEContactsService) {}

  @Roles(['admin'])
  @Post('new')
  @ApiOperation({ summary: 'Create a new ICE contact' })
  @ApiResponse({
    status: 201,
    description: 'ICE contact successfully created.',
    type: CreateICEContactDto,
  })
  async create(@Body() createICEContactDto: CreateICEContactDto) {
    return await this.iceContactsService.create(createICEContactDto);
  }

  @Roles(['admin', 'bureau'])
  @Get('all')
  @ApiOperation({ summary: 'Get all ICE contacts' })
  @ApiResponse({
    status: 200,
    description: 'List of ICE contacts retrieved.',
    isArray: true,
  })
  async findAll() {
    return await this.iceContactsService.findAll();
  }

  @Roles(['admin', 'bureau'])
  @Get('region')
  @ApiOperation({ summary: 'Get all ICE contacts in a region' })
  @ApiQuery({
    name: 'region',
    required: false,
    description: 'Filter by region',
    example: 'gauteng',
  })
  @ApiResponse({
    status: 200,
    description: 'List of ICE contacts in the specified region.',
    isArray: true,
  })
  async findAllByRegion(@Query('region') region?: string) {
    return await this.iceContactsService.findByRegion(region);
  }

  @Roles(['admin', 'bureau'])
  @Get('company/:companyId')
  @ApiOperation({ summary: 'Get all ICE contacts for a specific company' })
  @ApiParam({
    name: 'companyId',
    description: 'Company ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'List of ICE contacts for the specified company.',
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid company ID format.',
  })
  async findByCompany(@Param('companyId') companyId: string) {
    return await this.iceContactsService.findByCompany(companyId);
  }

  @Roles(['admin', 'bureau'])
  @Get(':id')
  @ApiOperation({ summary: 'Get an ICE contact by ID' })
  @ApiParam({ name: 'id', description: 'ICE contact ID' })
  @ApiResponse({ status: 200, description: 'ICE contact found.' })
  @ApiResponse({ status: 404, description: 'ICE contact not found.' })
  async findOne(@Param('id') id: string) {
    return await this.iceContactsService.findOne(id);
  }

  @Roles(['admin'])
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update an ICE contact' })
  @ApiParam({ name: 'id', description: 'ICE contact ID' })
  @ApiResponse({ status: 200, description: 'ICE contact updated.' })
  @ApiResponse({ status: 404, description: 'ICE contact not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateICEContactDto: UpdateICEContactDto,
  ) {
    return await this.iceContactsService.update(id, updateICEContactDto);
  }

  @Roles(['admin'])
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ICE contact' })
  @ApiParam({ name: 'id', description: 'ICE contact ID' })
  @ApiResponse({ status: 200, description: 'ICE contact deleted.' })
  @ApiResponse({ status: 404, description: 'ICE contact not found.' })
  async remove(@Param('id') id: string) {
    await this.iceContactsService.remove(id);
    return { message: 'ICE Contact deleted successfully' };
  }
}
