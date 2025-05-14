import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Institute, InstituteDocument } from './schemas/institute.schema';
import { messages } from '../common/messages';

@Injectable()
export class InstituteService {
  constructor(
    @InjectModel(Institute.name) private readonly instituteModel: Model<InstituteDocument>,
  ) {}

  async create(data: Partial<Institute>): Promise<InstituteDocument> {
    const createdInstitute = new this.instituteModel(data);
    return createdInstitute.save();
  }

  async findAll(): Promise<InstituteDocument[]> {
    return this.instituteModel.find().exec();
  }

  async findOne(id: string): Promise<InstituteDocument> {
    const institute = await this.instituteModel.findById(id).exec();
    if (!institute) {
      throw new NotFoundException(messages.notFound.message);
    }
    return institute;
  }

  async update(id: string, data: Partial<Institute>): Promise<InstituteDocument> {
    const current = await this.instituteModel.findById(id).exec();
    if (!current) {
      throw new NotFoundException(messages.notFound.message);
    }

    const updateData: Partial<Institute> = {};
    if (typeof data.instituteName !== 'undefined' && data.instituteName !== '') {
      updateData.instituteName = data.instituteName;
    } else {
      updateData.instituteName = current.instituteName;
    }

    if (data.instituteImages?.length) {
      updateData.instituteImages = [...(current.instituteImages || []), ...data.instituteImages];
    } else {
      updateData.instituteImages = current.instituteImages;
    }

    if (typeof data.instituteDescription !== 'undefined' && data.instituteDescription !== '') {
      updateData.instituteDescription = data.instituteDescription;
    } else {
      updateData.instituteDescription = current.instituteDescription;
    }

    const updated = await this.instituteModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updated) {
      throw new NotFoundException(messages.error.message);
    }

    return updated;
  }

  async remove(id: string): Promise<InstituteDocument> {
    const deleted = await this.instituteModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(messages.notFound.message);
    }
    return deleted;
  }

  async removeImage(id: string, image: string): Promise<InstituteDocument> {
    const institute = await this.instituteModel.findById(id).exec();
    if (!institute) {
      throw new NotFoundException(messages.notFound.message);
    }
    const updatedImages = (institute.instituteImages || []).filter(img => img !== image);
    institute.instituteImages = updatedImages;
    await institute.save();
    return institute;
  }
}
