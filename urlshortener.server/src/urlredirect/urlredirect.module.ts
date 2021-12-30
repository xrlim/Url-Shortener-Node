import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlTranslation } from 'src/urlshorten/entities/urlTranslation.entity';
import { UrlShortenerSettings } from 'src/urlshorten/models/urlShortenerSettings.models';
import { UrlredirectController } from './urlredirect.controller';
import { UrlRedirectService } from './urlRedirect.service';

@Module({
  imports: [TypeOrmModule.forFeature([UrlTranslation])],
  providers: [UrlRedirectService, UrlShortenerSettings],
  controllers: [UrlredirectController],
})
export class UrlRedirectModule {}