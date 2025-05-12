import { Injectable, NotFoundException , UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
     @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.UserModel.findOne({ Email: email }).exec();
  }

  async create(data: Partial<User>): Promise<UserDocument> {
    if (!data.Password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(data.Password, 10);
    const createdUser = new this.UserModel({ ...data, Password: hashedPassword });
    return await createdUser.save();
  }

async login(Email: string, Password: string): Promise<{ user: UserDocument, access_token: string, }> {


    const user = await this.findByEmail(Email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
     throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user._id, email: user.Email };
    
  const access_token = await this.jwtService.signAsync(payload);

  return {
    user,
    access_token,
  };
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.UserModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.UserModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, data: Partial<User>): Promise<UserDocument> {
    const updatedUser = await this.UserModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async remove(id: string): Promise<UserDocument> {
    const deletedUser = await this.UserModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}
