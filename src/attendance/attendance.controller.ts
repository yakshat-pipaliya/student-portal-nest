import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, Req, } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './schemas/attendance.schema';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('attendance')
@ApiBearerAuth('access-token')
@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createAttendanceDto: CreateAttendanceDto) {
        return this.attendanceService.create(createAttendanceDto);
    }

    @Get()
    findAll() {
        return this.attendanceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.attendanceService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id') id: string,
        @Body() updateAttendanceDto: UpdateAttendanceDto,
        @Req() req,
    ) {
        updateAttendanceDto['updatedAt'] = new Date();
        return this.attendanceService.update(id, updateAttendanceDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    remove(@Param('id') id: string, @Req() req) {
        return this.attendanceService.remove(id);
    }

}
