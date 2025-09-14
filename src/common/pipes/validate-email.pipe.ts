import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class ValidateEmailPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!isEmail(value)) {
      throw new BadRequestException('Invalid email address');
    }
    return value;
  }
}
