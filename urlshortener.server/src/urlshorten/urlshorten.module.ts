import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlTranslation } from './entities/urlTranslation.entity';
import { UrlShortenerSettings } from './models/urlShortenerSettings.models';
import { UrlshortenController } from './urlshorten.controller';
import { UrlShortenHelper } from './urlshorten.helper';
import { UrlShortenService } from './urlShorten.service';

@Module({
  imports: [TypeOrmModule.forFeature([UrlTranslation])],
  providers: [UrlShortenService, UrlShortenHelper, UrlShortenerSettings],
  controllers: [UrlshortenController],
})
export class UrlShortenModule {}