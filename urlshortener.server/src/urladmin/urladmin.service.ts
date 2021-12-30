import { Get, Post, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UrlTranslation } from "src/urlshorten/entities/urlTranslation.entity";
import { UrlShortenerSettings } from "src/urlshorten/models/urlShortenerSettings.models";
import { Repository } from "typeorm";

@Injectable()
export class UrlAdminService {
    constructor(private readonly urlShortenerSettings: UrlShortenerSettings,
        @InjectRepository(UrlTranslation)
        private urlTranslationRepository: Repository<UrlTranslation>) { }


    async getUrlListInfo(): Promise<UrlTranslation[]> {
        return this.urlTranslationRepository.find();
    }

    async deleteUrl(id: number): Promise<boolean> {
        let deleteResult = await this.urlTranslationRepository.delete({ id });
        if (deleteResult.affected > 0) {
            return true;
        }
        return false;
    }

}