import { Module } from '@nestjs/common';
import { UrlShortenModule } from './urlshorten/urlshorten.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlTranslation } from './urlshorten/entities/urlTranslation.entity';
import { UrlRedirectModule } from './urlredirect/urlredirect.module';
import { UrlAdminModule } from './urladmin/urladmin.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'urlshorten.db',
    synchronize: true,
    logging: false,
    keepConnectionAlive: true,
    autoLoadEntities: true,
    entities: [UrlTranslation],
  }), UrlShortenModule, UrlAdminModule, UrlRedirectModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
