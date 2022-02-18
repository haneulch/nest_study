import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageReqDto } from './dto/create-message.req.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() body: CreateMessageReqDto) {
    return this.messageService.create(body);
  }

  @Get('content/:contentId')
  findAll(@Param('contentId') contentId: string) {
    return this.messageService.findAll(+contentId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }

  @Patch('report/:id')
  report(@Param('id') id: string) {
    return this.messageService.report(+id);
  }
}
