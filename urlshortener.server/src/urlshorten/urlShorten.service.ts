import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlTranslation } from './entities/urlTranslation.entity';
import { UrlShortenerSettings } from './models/urlShortenerSettings.models';
import { UrlShortenHelper } from './urlshorten.helper';


@Injectable()
export class UrlShortenService {
  constructor(private readonly urlShortenHelper: UrlShortenHelper,
    private readonly urlShortenerSettings: UrlShortenerSettings,
    @InjectRepository(UrlTranslation)
    private urlTranslationRepository: Repository<UrlTranslation>) { }

  //
  async shortenUrl(url: string): Promise<string> {
    let urlTranslation: UrlTranslation = await this.urlTranslationRepository.findOne({ fromUrl: url });
    let toUrl: string = "";
    if (urlTranslation === undefined) {
      let newId: string = await this.generateUniqueId();
      toUrl = this.urlShortenerSettings.urlShortenerDomain + newId;
      urlTranslation = {
        id: undefined,
        fromUrl: url,
        toUrl: toUrl,
        toId: newId,
        lastModifiedAt: new Date(),
        clickCount: 0
      }
      await this.urlTranslationRepository.save(urlTranslation);
    } else {
      toUrl = urlTranslation.toUrl;
    }
    return toUrl;
  }

  async generateUniqueId(): Promise<string> {
    let id: string = this.urlShortenHelper.generateId(this.urlShortenerSettings.uniqueIdLength);
    const [list, count] = await this.urlTranslationRepository.findAndCount({ toId: id });
    if (count > 0) {
      return this.generateUniqueId();
    }
    return id;
  }
}
