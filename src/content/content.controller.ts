import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Public } from '../auth/jwt-auth.guard';
import { SearchContentDto } from './dto/search-content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  @Get()
  findAll(@Body() searchContentDto: SearchContentDto) {
    return this.contentService.findAll(searchContentDto);
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
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(+id, updateContentDto);
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
