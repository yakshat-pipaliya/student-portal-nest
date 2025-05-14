import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { messages } from '../common/messages';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private readonly ProfileModel: Model<ProfileDocument>,
  ) { }

  async create(data: Partial<Profile>): Promise<ProfileDocument> {
    const createdProfile = new this.ProfileModel(data);
    return await createdProfile.save();
  }

  async findAll(): Promise<ProfileDocument[]> {
    try {
      const profiles = await this.ProfileModel.aggregate([
        { $lookup: { from: 'users', localField: 'UserId', foreignField: '_id', as: 'user' } },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            UserName: { $ifNull: ['$user.Name', 'No User Found'] },
            BOD: 1,
            Address: 1,
            PhoneNo: 1,
            profileImage: 1
          }
        }
      ]);

      return profiles;
    } catch (error) {
      throw new NotFoundException(messages.profileNotFound.message + ': ' + error.message);
    }
  }

  async findOne(id: string): Promise<ProfileDocument> {
    const result = await this.ProfileModel.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      { $lookup: { from: 'users', localField: 'UserId', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      {
        $project: {
          _id: 1,
          UserName: '$user.Name',
          BOD: 1,
          Address: 1,
          PhoneNo: 1,
          profileImage: 1
        }
      }
    ]).exec();

    if (!result || result.length === 0) {
      throw new NotFoundException(messages.profileNotFound.message);
    }

    return result[0];
  }

  async update(id: string, data: Partial<Profile>): Promise<ProfileDocument> {
    const updatedProfile = await this.ProfileModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).exec();
    if (!updatedProfile) {
      throw new NotFoundException(messages.profileNotFound.message);
    }
    return updatedProfile;
  }

  async remove(id: string): Promise<ProfileDocument> {
    const deletedProfile = await this.ProfileModel.findByIdAndDelete(id).exec();
    if (!deletedProfile) {
      throw new NotFoundException(messages.profileNotFound.message);
    }
    return deletedProfile;
  }
}
