import { conversionTimeFormat } from 'src/common/untils/time';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column()
  difficulty: number;

  @Column({
    default: false,
  })
  isDeleted: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    transformer: {
      from: (value: Date) => conversionTimeFormat(value),
      to: (value: Date) => value,
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    transformer: {
      from: (value: Date) => conversionTimeFormat(value),
      to: (value: Date) => value,
    },
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;
}
