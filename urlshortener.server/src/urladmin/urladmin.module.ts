import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlTranslation } from 'src/urlshorten/entities/urlTranslation.entity';
import { UrlShortenerSettings } from 'src/urlshorten/models/urlShortenerSettings.models';
import { UrladminController } from './urladmin.controller';
import { UrlAdminService } from './urladmin.service';

@Module({
  imports: [TypeOrmModule.forFeature([UrlTranslation])],
  providers: [UrlAdminService, UrlShortenerSettings],
  controllers: [UrladminController],
})
export class UrlAdminModule {}