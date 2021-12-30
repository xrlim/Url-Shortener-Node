import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlTranslation } from '../urlshorten/entities/urlTranslation.entity';
import { UrlShortenerSettings } from '../urlshorten/models/urlShortenerSettings.models';

@Injectable()
export class UrlRedirectService {
    constructor(private readonly urlShortenerSettings: UrlShortenerSettings,
        @InjectRepository(UrlTranslation)
        private urlTranslationRepository: Repository<UrlTranslation>) { }

    //
    async getRedirectUrl(id: string): Promise<string> {
        var urlTranslation = await this.urlTranslationRepository.findOne({ toId: id});
        if (urlTranslation == undefined) {
            return "";
        }
        urlTranslation.clickCount += 1;
        await this.urlTranslationRepository.save(urlTranslation);
        return urlTranslation.fromUrl;
    }
}
