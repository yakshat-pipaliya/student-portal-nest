import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './schemas/course.schema';

@Controller('course')
export class CourseController {
    constructor(private readonly CourseService: CourseService) {}

  @Post()
  create(@Body() data: Partial<Course>) {
    return this.CourseService.create(data);
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
  update(@Param('id') id: string, @Body() data: Partial<Course>) {
    return this.CourseService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CourseService.remove(id);
  }
}
