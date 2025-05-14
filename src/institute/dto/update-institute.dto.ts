import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateInstituteDto {
    @ApiProperty({
        example: 'Oxford University',
        required: false,
        description: 'Name of the institute (optional)'
    })
    @IsString()
    @IsOptional()
    instituteName?: string;

    @ApiProperty({
        type: [String],
        format: 'binary',
        required: false,
    })
    @IsOptional()
    instituteImages?: string[];

    @ApiProperty({
        example: 'A prestigious university in the UK.',
        required: false,
        description: 'Description of the institute (optional)'
    })
    @IsString()
    @IsOptional()
    instituteDescription?: string;
}