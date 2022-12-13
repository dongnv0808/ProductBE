import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { HttpErrorsInterceptor } from './common/interceptors/http-errors.interceptor';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NestApplication');
  app.enableCors();
  const configEnv = app.get(ConfigService);

  const configSwagger = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Product')
  .setDescription('Product document APIs')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('product/api', app, document);

  await app.listen(configEnv.get('port'));
  logger.log(
    `App is running on: ${configEnv.get('appUrl')}:${configEnv.get('port')}`,
  );
}
bootstrap();
