import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;

  title?: string;

  content?: string;

  difficulty?: number;

}
