import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.questionService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let target = await this.questionService.findOne(+id);
    if (target == null) {
      throw new HttpException('没有找到该问题', HttpStatus.NOT_FOUND);
    }
    return target;
  }

  @Put('update')
  update(
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
