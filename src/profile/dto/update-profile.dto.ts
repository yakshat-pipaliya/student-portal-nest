import { IsString, IsDateString, IsMongoId, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class UpdateProfileDto {
  @ApiProperty({
    example: '60d3b41abd7f00001f1d2b63', 
    description: 'The unique identifier of the user (referenced from User)',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  UserId?: ObjectId;

  @ApiProperty({
    example: '1990-05-15',
    description: 'The birth date of the user',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  BOD?: Date;

  @ApiProperty({
    example: '1234 Elm Street, Some City, Some Country',
    description: 'The address of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  Address?: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The phone number of the user',
    required: false,
  })
  @IsPhoneNumber()
  @IsOptional()
  PhoneNo?: Number;

  @ApiProperty({
    example: 'https://example.com/profile-image.jpg',
    description: 'The URL of the profile image',
    required: false,
  })
  @IsString()
  @IsOptional()
  profileImage?: string;
}
