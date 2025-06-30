import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
  Delete,
  // Delete,
  // Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
@ApiBearerAuth('JWT-auth')
@ApiTags('Drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driverService: DriversService) {}

  @Roles(['admin'])
  @Post('new')
  @ApiOperation({ summary: 'Create a new driver' })
  @ApiBody({ type: CreateDriverDto })
  @ApiResponse({
    status: 201,
    description: 'Driver created successfully',
  })
  async create(@Body() createDriverDto: CreateDriverDto) {
    return await this.driverService.create(createDriverDto);
  }

  @Roles(['admin', 'bureau'])
  @Get('all')
  @ApiOperation({ summary: 'Get all drivers' })
  @ApiResponse({ status: 200, description: 'List of all drivers retrieved' })
  async findAll() {
    return await this.driverService.findAll();
  }

  @Roles(['admin', 'bureau'])
  @Get('region')
  @ApiOperation({ summary: 'Get all drivers in a region' })
  @ApiQuery({
    name: 'region',
    required: false,
    description: 'Filter by region',
    example: 'gauteng',
  })
  @ApiResponse({
    status: 200,
    description: 'List of drivers in the specified region.',
    isArray: true,
  })
  async findAllByRegion(@Query('region') region?: string) {
    return await this.driverService.findByRegion(region);
  }

  @Roles(['admin', 'bureau'])
  @Get('company/:companyId')
  @ApiOperation({ summary: 'Get all drivers for a specific company' })
  @ApiParam({
    name: 'companyId',
    description: 'Company ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'List of drivers for the specified company.',
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid company ID format.',
  })
  async findByCompany(@Param('companyId') companyId: string) {
    return await this.driverService.findByCompany(companyId);
  }

  @Roles(['admin', 'bureau'])
  @Get(':id')
  @ApiOperation({ summary: 'Get a driver by ID' })
  @ApiParam({ name: 'id', description: 'Driver ID' })
  @ApiResponse({ status: 200, description: 'Driver found' })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  async findOne(@Param('id') id: string) {
    return await this.driverService.findOne(id);
  }

  @Roles(['admin'])
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a driver by ID' })
  @ApiParam({ name: 'id', description: 'Driver ID' })
  @ApiBody({ type: UpdateDriverDto })
  @ApiResponse({ status: 200, description: 'Driver updated successfully' })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  async update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ) {
    return await this.driverService.update(id, updateDriverDto);
  }

  @Roles(['admin'])
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a driver' })
  @ApiParam({ name: 'id', description: 'Driver ID' })
  @ApiResponse({ status: 200, description: 'Driver deleted.' })
  @ApiResponse({ status: 404, description: 'Driver not found.' })
  async remove(@Param('id') id: string) {
    return await this.driverService.remove(id);
  }

  @Post(':id/upload-url/:type')
  @Roles(['admin'])
  @ApiOperation({ summary: 'Get an upload URL' })
  @ApiParam({ name: 'id', description: 'Driver ID' })
  @ApiResponse({ status: 200, description: 'Upload URL retrieved.' })
  @ApiResponse({ status: 404, description: 'Driver not found.' })
  @ApiResponse({ status: 400, description: 'Invalid request body.' })
  async getUploadUrl(
    @Param('id') id: string,
    @Param('type') type: 'license-front' | 'license-back' | 'id-photo',
  ) {
    return this.driverService.getUploadUrl(id, type);
  }

  @Post(':id/license/urls')
  @Roles(['admin'])
  @ApiOperation({ summary: 'Update a driver license URLs' })
  @ApiParam({ name: 'id', description: 'Driver ID' })
  @ApiResponse({ status: 200, description: 'License URLs updated.' })
  @ApiResponse({ status: 404, description: 'Driver not found.' })
  @ApiResponse({ status: 400, description: 'Invalid request body.' })
  async updateLicenseUrls(
    @Param('id') id: string,
    @Body() body: { licenseFrontUrl: string; licenseBackUrl: string },
  ) {
    return this.driverService.updateLicenseUrls(
      id,
      body.licenseFrontUrl,
      body.licenseBackUrl,
    );
  }
}
