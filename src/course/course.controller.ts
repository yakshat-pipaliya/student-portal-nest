import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
@Controller('course')
export class CourseController {
    constructor(private readonly CourseService: CourseService) {}

  @Post()
  create(@Body() CreateCourseDto: CreateCourseDto) {
    return this.CourseService.create(CreateCourseDto);
  }

  @Get()
  findAll() {
    return this.CourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CourseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateCourseDto: UpdateCourseDto) {
    return this.CourseService.update(id, UpdateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CourseService.remove(id);
  }
}
