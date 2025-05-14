import { Injectable , NotFoundException,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { messages } from '../common/messages';

@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Course.name) private readonly CourseModel: Model<CourseDocument>,
    ){}

    async create(data: Partial<Course>): Promise<CourseDocument> {
        const createdUser = new this.CourseModel(data);
    return await createdUser.save();
    }

    async findAll(): Promise<CourseDocument[]> {
        return await this.CourseModel.find().exec();
      }

      async findOne(id: string): Promise<CourseDocument> {
        const user = await this.CourseModel.findById(id).exec();
        if (!user) {
          throw new NotFoundException(messages.courseNotFound.message);
        }
        return user;
      }
    
      async update(id: string, data: Partial<Course>): Promise<CourseDocument> {
        const updatedUser = await this.CourseModel.findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true,
        }).exec();
        if (!updatedUser) {
          throw new NotFoundException(messages.courseNotFound.message);
        }
        return updatedUser;
      }
    
      async remove(id: string): Promise<CourseDocument> {
        const deletedUser = await this.CourseModel.findByIdAndDelete(id).exec();
        if (!deletedUser) {
          throw new NotFoundException(messages.courseNotFound.message);
        }
        return deletedUser;
      }
}
