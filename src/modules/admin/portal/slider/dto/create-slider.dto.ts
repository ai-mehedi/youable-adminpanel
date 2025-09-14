

import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateSliderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

   @ApiProperty()
  @IsNotEmpty()
  @IsString()
  thumbnail: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  happyclients: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  successfulprojects: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  certificationsdelivered: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customersatisfaction: string;

  @ApiProperty()
  @IsOptional()
  isActive: boolean;
   @ApiProperty()
  @IsOptional()
  @IsMongoId()
  readonly action_id?: string;
}