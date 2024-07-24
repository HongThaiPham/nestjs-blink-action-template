import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ActionHeaderInterceptor } from './interceptors/action-header/action-header.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalInterceptors(new ActionHeaderInterceptor());
  await app.listen(3000);
}
bootstrap();
