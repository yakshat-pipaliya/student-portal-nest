import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { Attendance, AttendancesSchema } from './schemas/attendance.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: Attendance.name, schema: AttendancesSchema }])],
  controllers: [AttendanceController],
  providers: [AttendanceService]
})
export class AttendanceModule {}
