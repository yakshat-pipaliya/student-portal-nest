import { IsString, IsDateString, IsMongoId, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export class UpdateProfileDto {
  @ApiProperty({
    example: '60d3b41abd7f00001f1d2b63',
    description: 'The unique identifier of the user (referenced from User)',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  UserId?: ObjectId;

  @ApiProperty({
    example: '1990-05-15',
    description: 'The birth date of the user',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  BOD?: Date;

  @ApiProperty({
    example: '1234 Elm Street, Some City, Some Country',
    description: 'The address of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  Address?: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The phone number of the user',
    required: false,
  })
  @IsPhoneNumber()
  @IsOptional()
  @Transform(({ value }) => value === '' ? undefined : value)
  PhoneNo?: Number;

  @ApiProperty({
    type: [String],
    format: 'binary',
    required: false,
  })
  @IsOptional()
  profileImage?: string;
}
