import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class AddUpdateAdminDto {
  @IsNotEmpty()
  @MaxLength(24)
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  avatar: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  facebook: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  linkedin: string;

  @IsOptional()
  @MaxLength(100)
  readonly email?: string;

  @IsOptional()
  @MaxLength(32)
  readonly password?: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  readonly isActive: boolean;

  @IsOptional()
  @IsMongoId()
  readonly action_id?: string;
}
