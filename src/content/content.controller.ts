import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ContentService } from './content.service';
import { UpdateContentReqDto } from './dto/update-content.req.dto';
import { SearchContentReqDto } from './dto/search-content.req.dto';
import { CreateContentReqDto } from './dto/create-content.req.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  create(@Body() body: CreateContentReqDto) {
    return this.contentService.create(body);
  }

  @Get()
  findAll(@Body() body: SearchContentReqDto) {
    return this.contentService.findAll(body);
  }

  @Get('user/:username')
  findAllByUsername(@Req() req) {
    return this.contentService.findAllByUsername(req.params.username);
  }

  @Get(':id')
  findOne(@Req() req) {
    return this.contentService.findOne(req.params.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateContentReqDto) {
    return this.contentService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(+id);
  }

  @Patch('report/:id')
  report(@Param('id') id: string) {
    return this.contentService.report(+id);
  }

  @Patch('disconnect/:id')
  disconnect(@Param('id') id: string) {
    return this.contentService.disconnect(+id);
  }
}
