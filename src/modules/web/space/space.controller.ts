import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpaceService } from './space.service';
import { ValidateMongoIdPipe } from 'src/common/pipes/validate-mongo-id.pipe';
import { PaginateFaceDto } from '../face/dto/paginate-face.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Web - Space')
@Controller('web/space')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Get()
  getPaginatedSpaces(@Query() queryDto: PaginateFaceDto) {
    return this.spaceService.getPaginatedSpaces(queryDto);
  }

  @Get(':id')
  getSpaceById(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.spaceService.getSpaceById(id);
  }
}
