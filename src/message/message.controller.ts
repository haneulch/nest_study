import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Public } from '../auth/jwt-auth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
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
