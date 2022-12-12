import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/configuration';
import { AttributesModule } from './modules/attributes/attributes.module';
import { DatabaseModule } from './modules/database/database.module';
import { HTTPModule } from './modules/http/http.module';
import { ProductModule } from './modules/product/product.module';
// import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
      load: [configuration]
    }),
    AttributesModule,
    ProductModule,
    HTTPModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
