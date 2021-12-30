import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { UrlShortenerSettings } from 'src/urlshorten/models/urlShortenerSettings.models';
import { Response } from 'express';
import { UrlRedirectService } from './urlRedirect.service';

@Controller()
export class UrlredirectController {
    constructor(private readonly urlShortenSettings: UrlShortenerSettings, private readonly urlRedirectService: UrlRedirectService) { }

    @Get(':id')
    async index(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
        if (id.length != this.urlShortenSettings.uniqueIdLength) {
            return res.status(HttpStatus.NOT_FOUND).send();
        }
        let url = await this.urlRedirectService.getRedirectUrl(id);
        if (url !== "") {
            res.redirect(url);
        } else {
            res.redirect('/');
        }
    }
}
