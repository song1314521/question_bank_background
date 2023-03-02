import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionEntity } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
