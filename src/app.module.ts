import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import envConfig from '../config/env';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionModule } from './modules/question/question.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWD'),
        database: configService.get('DB_DATABASE'), 
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    QuestionModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
