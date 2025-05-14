import { IsString, IsDateString, IsObject, IsMongoId, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateProfileDto {
  @ApiProperty({
    example: '60d3b41abd7f00001f1d2b63', 
    description: 'The unique identifier of the user (referenced from User)',
  })
  @IsMongoId()
  UserId: ObjectId;

  @ApiProperty({
    example: '1990-05-15',
    description: 'The birth date of the user',
  })
  @IsDateString()
  BOD: Date;

  @ApiProperty({
    example: '1234 Elm Street, Some City, Some Country',
    description: 'The address of the user',
  })
  @IsString()
  Address: string;

  @ApiProperty({
    example: '9499870550',
    description: 'The phone number of the user',
  })
  @IsPhoneNumber()
  PhoneNo: Number;

  @ApiProperty({
    example: 'https://example.com/profile-image.jpg',
    description: 'The URL of the profile image',
    required: false,
  })
  profileImage?: string;
}
