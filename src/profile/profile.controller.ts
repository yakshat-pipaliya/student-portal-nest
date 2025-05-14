import {
  Controller, Get, Post, Body, Param, Delete, Patch,
  UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { Profile } from './schemas/profile.schema';
import { multerConfig } from './multer.config';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post()
  @UseInterceptors(FileInterceptor('profileImage', multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProfileDto })
  async create(
    @Body() data: CreateProfileDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      if (!file) {
        throw new BadRequestException('Profile image is required');
      }

      data.profileImage = `/uploads/profile/${file.filename}`;
      return await this.profileService.create(data);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Failed to upload profile image: ' + error.message);
    }
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('profileImage', multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateProfileDto })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file) {
        data.profileImage = `/uploads/profile/${file.filename}`;
      }

      return await this.profileService.update(id, data);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update profile: ' + error.message);
    }
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
