import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);
  const configEnv = app.get(ConfigService);

  await app.listen(configEnv.get('port'));
  logger.log(
    `App is running on: ${configEnv.get('appUrl')}:${configEnv.get('port')}`,
  );
}
bootstrap();
