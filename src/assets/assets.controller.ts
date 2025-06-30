import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { AssetsService } from '../assets/assets.service';
import { CreateAssetDto } from '../assets/dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
@ApiBearerAuth('JWT-auth')
@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Roles(['admin'])
  @Post('new')
  @ApiOperation({ summary: 'Create a new asset' })
  @ApiResponse({ status: 201, description: 'Asset created successfully' })
  @ApiBody({ type: CreateAssetDto })
  async create(@Body() createAssetDto: CreateAssetDto) {
    // Validate device configurations
    if (
      createAssetDto.cameraDevice.exists &&
      !createAssetDto.cameraDevice.provider
    ) {
      throw new BadRequestException(
        'Camera device provider is required when device exists',
      );
    }
    if (
      createAssetDto.telematicsDevice.exists &&
      !createAssetDto.telematicsDevice.provider
    ) {
      throw new BadRequestException(
        'Telematics device provider is required when device exists',
      );
    }
    if (createAssetDto.svrDevice.exists && !createAssetDto.svrDevice.deviceId) {
      throw new BadRequestException(
        'SVR device ID is required when device exists',
      );
    }
    return await this.assetsService.create(createAssetDto);
  }

  @Roles(['admin', 'bureau'])
  @Get('all')
  @ApiOperation({ summary: 'Get all assets' })
  @ApiResponse({ status: 200, description: 'List of all assets' })
  async findAll() {
    return await this.assetsService.findAll();
  }

  @Roles(['admin', 'bureau'])
  @Get('region')
  @ApiOperation({ summary: 'Get all assets in a region' })
  @ApiQuery({
    name: 'region',
    required: false,
    description: 'Filter by region',
    example: 'gauteng',
  })
  @ApiResponse({
    status: 200,
    description: 'List of assets in the specified region.',
    isArray: true,
  })
  async findAllByRegion(@Query('region') region?: string) {
    return await this.assetsService.findByRegion(region);
  }

  @Roles(['admin', 'bureau'])
  @Get('company/:companyId')
  @ApiOperation({ summary: 'Get all assets for a specific company' })
  @ApiParam({
    name: 'companyId',
    description: 'Company ID',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'List of assets for the specified company.',
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid company ID format.',
  })
  async findByCompany(@Param('companyId') companyId: string) {
    return await this.assetsService.findByCompany(companyId);
  }

  @Roles(['admin', 'bureau'])
  @Get(':id')
  @ApiOperation({ summary: 'Get a single asset by ID' })
  @ApiParam({ name: 'id', description: 'Asset ID' })
  @ApiResponse({ status: 200, description: 'Asset found' })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  async findOne(@Param('id') id: string) {
    return await this.assetsService.findOne(id);
  }

  @Roles(['admin'])
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update an asset by ID' })
  @ApiParam({ name: 'id', description: 'Asset ID' })
  @ApiBody({ type: UpdateAssetDto })
  @ApiResponse({ status: 200, description: 'Asset updated successfully' })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  async update(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ) {
    return await this.assetsService.update(id, updateAssetDto);
  }

  @Roles(['admin'])
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an asset' })
  @ApiParam({ name: 'id', description: 'Asset ID' })
  @ApiResponse({ status: 200, description: 'Asset deleted.' })
  @ApiResponse({ status: 404, description: 'Asset not found.' })
  async remove(@Param('id') id: string) {
    return await this.assetsService.remove(id);
  }
}
