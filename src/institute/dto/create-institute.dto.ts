  import { ApiProperty } from '@nestjs/swagger';
  import {IsArray,IsNotEmpty,IsString,ArrayMinSize,} from 'class-validator';

  export class CreateInstituteDto {
    @ApiProperty({ example: 'Oxford University' })
    @IsString()
    @IsNotEmpty()
    instituteName: string;

    @ApiProperty({
      type: [String],
      format: 'binary',
      required: false,
    })
    instituteImages?: string[];

    @ApiProperty({ example: 'A prestigious university in the UK.' })
    @IsString()
    @IsNotEmpty()
    instituteDescription: string;
  }
