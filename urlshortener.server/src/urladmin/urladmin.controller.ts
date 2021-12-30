import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UrlTranslation } from 'src/urlshorten/entities/urlTranslation.entity';
import { UrlAdminService } from './urladmin.service';

@Controller('urladmin')
export class UrladminController {
    constructor(private readonly urlAdminService: UrlAdminService) { }

    @Get()
    async getList(): Promise<UrlTranslation[]> {
        let result = await this.urlAdminService.getUrlListInfo();
        return result;
    }

    @Delete()
    async delete(@Query('id') id: number): Promise<boolean> {
        return this.urlAdminService.deleteUrl(id);
    }

}
