import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filter/filter.filter';
import { ResponseInterceptor } from './common/intercetor/intercetor.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000, () => {
    console.log(`服务器启动成功:http://localhost:3000`);
  });
}
bootstrap();
