import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './schemas/attendance.schema';

@Controller('attendance')
export class AttendanceController {

    constructor(private readonly AttendanceService: AttendanceService) { }

    @Post()
    create(@Body() data: Partial<Attendance>) {
        return this.AttendanceService.create(data);
    }

    @Get()
    findAll() {
        return this.AttendanceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.AttendanceService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: Partial<Attendance>) {
        return this.AttendanceService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.AttendanceService.remove(id);

    }
}
