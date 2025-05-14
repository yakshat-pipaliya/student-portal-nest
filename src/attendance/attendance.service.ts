import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model , Types} from 'mongoose';
import { Attendance, AttendanceDocument } from './schemas/attendance.schema';
import { messages } from '../common/messages';

@Injectable()
export class AttendanceService {

  constructor(
    @InjectModel(Attendance.name) private readonly AttendanceModel: Model<AttendanceDocument>,
  ) { }

  async create(data: Partial<Attendance>): Promise<AttendanceDocument> {
    const createdUser = new this.AttendanceModel(data);
    return await createdUser.save();
  }

  async findAll(): Promise<AttendanceDocument[]> {
    return this.AttendanceModel.aggregate([
      { $lookup: { from: 'users', localField: 'UserId', foreignField: '_id', as: 'user' } },
      { $lookup: { from: 'courses', localField: 'CourseId', foreignField: '_id', as: 'course' } },
      { $unwind: '$user' },
      { $unwind: '$course' },
      {
        $project: {
          _id: 1,
          UserName: '$user.Name',
          CourseName: '$course.Course_Name',
          Duration: '$course.Duration',
          CourseDetails: '$course.Course_Details',
          Date: 1,
          Status: 1
        }
      }
    ]);
  }


  async findOne(id: string): Promise<AttendanceDocument> {
    const result = await this.AttendanceModel.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      { $lookup: { from: 'users', localField: 'UserId', foreignField: '_id', as: 'user' } },
      { $lookup: { from: 'courses', localField: 'CourseId', foreignField: '_id', as: 'course' } },
      { $unwind: '$user' },
      { $unwind: '$course' },
      {
        $project: {
          _id: 1,
          UserName: '$user.Name',
          CourseName: '$course.Course_Name',
          Duration: '$course.Duration',
          CourseDetails: '$course.Course_Details',
          Date: 1,
          Status: 1
        }
      }
    ]).exec();
  
    if (!result || result.length === 0) {
      throw new NotFoundException(messages.attendanceNotFound.message);
    }
  
    return result[0];
  }

  async update(id: string, data: Partial<Attendance>): Promise<AttendanceDocument> {
    const updatedUser = await this.AttendanceModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).exec();
    if (!updatedUser) {
      throw new NotFoundException(messages.attendanceNotFound.message);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<AttendanceDocument> {
    const deletedUser = await this.AttendanceModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(messages.attendanceNotFound.message);
    }
    return deletedUser;
  }
}
