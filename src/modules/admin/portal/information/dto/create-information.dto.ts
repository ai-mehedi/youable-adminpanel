import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateInformationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    whatsappnumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    contactnumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    isActive: boolean;

    @ApiProperty()
    @IsOptional()
    @IsMongoId()
    readonly action_id?: string;
}
