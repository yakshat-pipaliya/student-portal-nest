import {
  Controller, Get, Post, Body, Param, Delete, Patch,
  UseInterceptors, UploadedFiles, BadRequestException, InternalServerErrorException
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { InstituteService } from './institute.service';
import { multerConfig } from './multer.config';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { ApiBody, ApiConsumes, ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { messages } from '../common/messages';

@ApiTags('Institute')
@Controller('institute')
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('instituteImages', 10, multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateInstituteDto })
  async create(
    @Body() createInstituteDto: CreateInstituteDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException(messages.fileUploadFailed.message);
    }

    createInstituteDto['instituteImages'] = files.map((file) => `/uploads/institute/${file.filename}`);

    return this.instituteService.create(createInstituteDto);
  }


  @Get()
  findAll() {
    return this.instituteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instituteService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('instituteImages', 10, multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateInstituteDto })
  async update(
    @Param('id') id: string,
    @Body() updateInstituteDto: UpdateInstituteDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files && files.length > 0) {
      updateInstituteDto.instituteImages = files.map(file => `/uploads/institute/${file.filename}`);
    }
    return this.instituteService.update(id, updateInstituteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instituteService.remove(id);
  }

  @Delete(':id/image')
  @ApiOperation({ summary: 'Delete a single image from an institute' })
  @ApiParam({ name: 'id', description: 'Institute ID' })
  @ApiBody({ schema: { properties: { image: { type: 'string', example: '/uploads/institute/filename.jpg' } } } })
  async removeImage(
    @Param('id') id: string,
    @Body('image') image: string
  ) {
    if (!image) {
      throw new BadRequestException(messages.fileUploadFailed.message);
    }
    return this.instituteService.removeImage(id, image);
  }
}
