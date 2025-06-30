import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
  Query,
  Delete,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiBearerAuth('JWT-auth')
@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companyService: CompaniesService) {}

  @Roles(['admin'])
  @Post('new')
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, description: 'Company successfully created.' })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companyService.create(createCompanyDto);
  }

  @Roles(['admin', 'bureau'])
  @Get('region')
  @ApiOperation({ summary: 'Get all companies in a region' })
  @ApiResponse({ status: 200, description: 'List of companies retrieved.' })
  async findAllByRegion(@Query('region') region?: string) {
    return await this.companyService.findAllByRegion(region);
  }

  @Roles(['admin', 'bureau'])
  @Get('all')
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'List of companies retrieved.' })
  async findAll() {
    return await this.companyService.findAll();
  }

  @Roles(['admin', 'bureau'])
  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiResponse({ status: 200, description: 'Company found.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  async findOne(@Param('id') id: string) {
    return await this.companyService.findOne(id);
  }

  @Roles(['admin'])
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a company' })
  @ApiResponse({ status: 200, description: 'Company updated.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companyService.update(id, updateCompanyDto);
  }

  @Roles(['admin'])
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  @ApiResponse({ status: 200, description: 'Company deleted.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  async remove(@Param('id') id: string) {
    return await this.companyService.remove(id);
  }
}
