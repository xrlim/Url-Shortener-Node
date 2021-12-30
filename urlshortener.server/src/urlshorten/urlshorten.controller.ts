import { Controller, Post, Res, HttpStatus, Body, Get } from '@nestjs/common';
import { Response } from 'express';
import { URL } from 'url';
import { shortenUrlRequest } from "./request/shortenUrlRequest"
import { UrlShortenService } from './urlShorten.service';
@Controller()
export class UrlshortenController {
  constructor(private readonly urlShortenService: UrlShortenService) { }

  @Post('shortenUrl')
  async shortenUrl(@Body() request: shortenUrlRequest, @Res({ passthrough: true }) res: Response) {
    try {
      const myUrl = new URL(request.url);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(`Request url is invalid!`);
    }

    let newUrl = await this.urlShortenService.shortenUrl(request.url);
    res.status(HttpStatus.OK).send(newUrl);
  }

}
