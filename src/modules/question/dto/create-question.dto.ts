import { IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty({
    message: '标题不能为空',
  })
  title: string;
  @IsNotEmpty({
    message: '内容不能为空',
  })
  content: string;
  @IsNotEmpty({
    message: '难度不能为空',
  })
  difficulty: number;
}
