import { Controller, Get, Post, Body, Param, Delete, Patch, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { Profile } from './schemas/profile.schema';
import { multerConfig } from './multer.config';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post()
  @UseInterceptors(FileInterceptor('profileImage', multerConfig))
  async create(
    @Body() data: Partial<Profile>,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      if (!file) {
        throw new BadRequestException('Profile image is required');
      }

      data.profileImage = `/uploads/profile/${file.filename}`;
      return await this.profileService.create(data);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
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
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Profile>,
    @UploadedFile() file: Express.Multer.File
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
