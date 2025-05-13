import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { messages } from '../common/messages';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ Email: email }).exec();
  }

  async create(data: Partial<User>): Promise<UserDocument> {
    if (!data.Password) {
      throw new Error(messages.passwordRequired.message);
    }
    const hashedPassword = await bcrypt.hash(data.Password, 10);
    const createdUser = new this.userModel({ ...data, Password: hashedPassword });
    return await createdUser.save();
  }

  async login(email: string, password: string): Promise<{ user: UserDocument; access_token: string }> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(messages.loginFailed.message);
    }

    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(messages.loginFailed.message);
    }

    const payload = { sub: user._id, email: user.Email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      user,
      access_token,
    };
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(messages.userNotFound.message);
    }
    return user;
  }

  async update(id: string, data: Partial<User>): Promise<UserDocument> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).exec();
    if (!updatedUser) {
      throw new NotFoundException(messages.userNotFound.message);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<UserDocument> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(messages.userNotFound.message);
    }
    return deletedUser;
  }
}
