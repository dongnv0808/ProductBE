import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: 'productDatasource',
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('mssql.host'),
        port: configService.get('mssql.port'),
        username: configService.get('mssql.username'),
        password: configService.get('mssql.password'),
        database: configService.get('mssql.database'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        options: {
          encrypt: false,
        },
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
