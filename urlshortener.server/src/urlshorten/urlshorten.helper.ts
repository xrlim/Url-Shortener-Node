import { Injectable } from '@nestjs/common';


@Injectable()
export class UrlShortenHelper {

    generateId(length: number): string {
        let chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result: string = '';
        for (let i: number = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
}
