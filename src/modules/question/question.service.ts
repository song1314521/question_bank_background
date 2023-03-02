import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm/repository/Repository';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionEntity } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionEntity: Repository<QuestionEntity>,
  ) {}
  async create(createQuestionDto: CreateQuestionDto) {
    await this.questionEntity.save(createQuestionDto);
    return '新增成功';
  }

  async findAll(query: any) {
    // 实现分页查询 字段isDeleted默认为false
    const { page = 1, pageSize = 10, ...params } = query;
    params.isDeleted = false;

    const [list, total] = await this.questionEntity.findAndCount({
      where: params,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      list,
      total,
    };
  }

  async findOne(id: number) {
    let target = await this.questionEntity.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (target == null) {
      throw new HttpException('没有找到该问题', HttpStatus.NOT_FOUND);
    }
    return target;
  }

  async update(updateQuestionDto: UpdateQuestionDto) {
    let target = await this.questionEntity.findOne({
      where: {
        id: updateQuestionDto.id,
        isDeleted: false,
      },
    });
    if (target == null) {
      throw new HttpException('未查询到该题目', HttpStatus.BAD_REQUEST);
    }
    let result = await this.questionEntity.update(
      updateQuestionDto.id,
      updateQuestionDto,
    );
    if (result.affected > 0) {
      return '更新成功';
    }
    return '更新失败';
  }

  async remove(id: number) {
    let target = await this.questionEntity.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (target == null) {
      throw new HttpException('未查询到该题目', HttpStatus.BAD_REQUEST);
    }
    target.isDeleted = true;
    let result = await this.questionEntity.save(target);

    if (!!result) {
      return '删除成功';
    }
  }
}
