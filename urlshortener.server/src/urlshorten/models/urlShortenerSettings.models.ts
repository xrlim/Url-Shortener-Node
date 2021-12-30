import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlShortenerSettings {
    uniqueIdLength: number = 8;
    urlShortenerDomain: string = "http://localhost:3000/";
}